import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PublicEventsService } from '../public-events.service';
import * as L from 'leaflet';
import { ModalController } from '@ionic/angular';
import { CreateHappeningsComponent } from '../create/create.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  loading: boolean = true;
  mapOptions: any = null;
  myMap: any;
  timeFilter: string;
  markerLayer: any;

  advancedSettingsOpen: boolean = false;

  constructor(
    private geolocation: Geolocation,
    private api: PublicEventsService,
    private modalController: ModalController
  ) {
    this.timeFilter = "today";
  }

  async createHappening() {
    const modal = await this.modalController.create({
      component: CreateHappeningsComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  initmap(latitude: number, longitude: number){
    setTimeout(() => {
      this.myMap = L.map('map', {
        zoomControl: false,
      }).setView([latitude, longitude], 14);
      L.tileLayer('http://tiles.hel.ninja/styles/hel-osm-light/{z}/{x}/{y}@2x@fi.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.myMap);
      this.loading = false;
      this.getPublicEvents();
    }, 500);

  }


  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.initmap(resp.coords.latitude, resp.coords.longitude)
    }).catch((error) => {
      console.log('Error getting location', error);
      this.initmap(60.166336, 24.946783)
     });
  }

  getPublicEvents(){
    if(this.markerLayer){
      this.markerLayer.clearLayers();
    }
    this.markerLayer = L.layerGroup().addTo(this.myMap);
    this.api.getPublicEvents(this.timeFilter).subscribe(response => {
      response.forEach(marker => {
        L.marker([marker.longitude, marker.latitude]).addTo(this.markerLayer)
        .bindPopup('<strong>'+marker.happening_name +'</strong></br>' + marker.happening_information + '</br>'+marker.happening_starts+' - '+marker.happening_ends);
      })
    });
  }

  setTimeFilter(event){
    console.log(event.detail.value);
    this.timeFilter = event.detail.value;
    this.getPublicEvents();
  }
}
