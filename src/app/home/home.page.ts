import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PublicEventsService } from '../public-events.service';
import * as L from 'leaflet';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  loading: boolean = true;
  mapOptions: any = null;
  myMap: any;

  constructor(
    private geolocation: Geolocation,
    private api: PublicEventsService
  ) {}

  initmap(latitude: number, longitude: number){
    setTimeout(() => {
      this.myMap = L.map('map', {
        zoomControl: false,
      }).setView([latitude, longitude], 11);
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
    this.api.getPublicEvents().subscribe(response => {
      response.forEach(marker => {
        console.log(marker);
        L.marker([marker.longitude, marker.latitude]).addTo(this.myMap)
        .bindPopup('<strong>'+marker.happening_name +'</strong></br>' + marker.happening_information + '</br>'+marker.happening_starts+' - '+marker.happening_ends);
      })
    });
  }

}
