import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/User';
import { AuthenticationService } from 'src/services/authentication.service';
import { ToasterService } from 'src/services/toaster.service';
import { HappeningService } from 'src/services/happening.service';
import { Happenings } from 'src/models/happenings';
import { Invites } from 'src/models/happenings';
import { ToastMessage } from 'src/models/ToastMessage';
import { ModalController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import * as L from 'leaflet';
import { GeocodingService } from 'src/services/geocoding.service';
import { InviteComponent } from './invites/invite.component';

@Component({
  selector: 'happening',
  templateUrl: './happening.component.html',
  styleUrls: ['./happening.component.css']
})
export class HappeningComponent implements OnInit{

  happening: Happenings;
  form: FormGroup;
  myMap: L.Map;
  minDate: string;
  showMap: boolean = false;
  searchDelay: any;
  lat: number = null;
  lon: number = null;
  locationMarker: L.Marker;
  view: string = "happening";

  constructor(
    private happeningService: HappeningService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToasterService,
    private modalController: ModalController,
    private datePipe: DatePipe,
    private geocoding: GeocodingService
  ) {
    
  }

  ionViewWillEnter() {
    // Get the UUID
    var uuid = this.route.snapshot.paramMap.get("uuid");
    this.happeningService.getHappening(uuid).subscribe(happening => {
      this.happening = happening;
      if(this.view == "happening"){
      this.initFormGroup();
        this.form.valueChanges.subscribe(formData => {
          clearTimeout(this.searchDelay);
          this.searchDelay = setTimeout(() => {
              this.checkAddress();
          }, 1000);
        })
      }
    });
  }

  checkAddress(){
    if(this.form.get('street_address').valid && this.form.get('zipcode').valid && this.form.get('city').valid){
      this.happening.street_address = this.form.getRawValue().street_address;
      this.happening.zipcode = this.form.getRawValue().zipcode;
      this.happening.city = this.form.getRawValue().city;
      // Try to get the address coords
      this.geocoding.getCoordsForHappening(this.happening).subscribe(response => {
        if(response.length){
          // Get first entry
          console.log(response[0].lat+", "+response[0].lon);
          // If not same as previous
          if(this.lat != response[0].lat && this.lon != response[0].lon){
            // Save the coords
            this.lat = response[0].lat;
            this.lon = response[0].lon;
            // Init the map
            this.initmap(response[0].lat, response[0].lon);
          }
        }
      })
    }
  }

  ngOnInit(){
    //
  }

  initFormGroup() {
    this.form = new FormGroup({
      public: new FormControl(this.happening.public, [Validators.required]),
      happening_name: new FormControl(this.happening.happening_name, [Validators.required]),
      happening_information: new FormControl(this.happening.happening_information, [Validators.required]),
      happening_starts: new FormControl(this.happening.happening_starts, [Validators.required]),
      happening_ends: new FormControl(this.happening.happening_ends_org, [Validators.required]),
      street_address: new FormControl(this.happening.street_address, [Validators.required]),
      zipcode: new FormControl(this.happening.zipcode, [Validators.required]),
      city: new FormControl(this.happening.city, [Validators.required])
    });
    this.lat = this.happening.latitude;
    this.lon = this.happening.longitude;
    if(this.lat && this.lon){
      this.initmap(this.lat, this.lon);
    } else {
      this.checkAddress();
    }
  }

  initmap(latitude: number, longitude: number){
    console.log("map:" + latitude+" "+longitude);
    if(!this.showMap){
      this.showMap = true;
      setTimeout(() => {
        this.myMap = L.map('mapedit', {
          zoomControl: false,
        }).setView([latitude, longitude], 14);
        L.tileLayer('http://tiles.hel.ninja/styles/hel-osm-light/{z}/{x}/{y}@2x@fi.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.myMap);

        this.locationMarker = L.marker([latitude, longitude], {draggable: true}).addTo(this.myMap);
        this.locationMarker.on("dragend", (data) => {
          let newLatLng = data.target.getLatLng();
          console.log(newLatLng);
          this.lat = newLatLng.lat;
          this.lon = newLatLng.lng;
        })
      }, 500);
    } else {
      // Map already shown set pin to this
      this.locationMarker.setLatLng([latitude, longitude]);
      this.myMap.setView([latitude, longitude], 14);
    }
  }

  toggleView(event){
    this.view = event.detail.value;
    if(this.view == "happening"){
      this.initmap(this.lat, this.lon);
    } else {
      this.showMap = false;
    }
  }

  deleteInvite(invite: Invites){
    //
  }

  saveHappening() {
    // Set the form values to model
    this.happening.public = this.form.getRawValue().public;
    this.happening.happening_name = this.form.getRawValue().happening_name;
    this.happening.happening_information = this.form.getRawValue().happening_information;
    this.happening.happening_starts = this.datePipe.transform(Date.parse(this.form.getRawValue().happening_starts), "yyyy-MM-dd HH:mm");
    this.happening.happening_ends = this.datePipe.transform(Date.parse(this.form.getRawValue().happening_ends), "yyyy-MM-dd HH:mm");

    this.happening.street_address = this.form.getRawValue().street_address;
    this.happening.zipcode = this.form.getRawValue().zipcode;
    this.happening.city = this.form.getRawValue().city;

    // Set possible latlng
    this.happening.latitude = this.lat;
    this.happening.longitude = this.lon;

    this.happeningService.saveHappening(this.happening).subscribe(success => {
      this.toast.addMessage("Happening stored");
    }, error => {
      // Error
      this.toast.addMessage("Error storing happening");
    })
  }

  async openInvite(invite: Invites = new Invites) {

    // Set default attendees
    if(!invite.max_attendees){
      invite.max_attendees = 1;
    }
    // Open modal and pass on invite
    const modal = await this.modalController.create({
      component: InviteComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'invite': invite,
        'happening_uuid': this.happening.uuid,
      }
    });

    modal.onDidDismiss().then(() => {
      this.ionViewWillEnter();
    })
    return await modal.present();
  }
}

