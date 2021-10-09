import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContactForm } from "../models/ContactForm";
import { LoginForm, User } from '../models/User';
import { Happenings } from '../models/happenings';
import { API_BASE_URL } from 'src/config';
import { NominatimResponse } from 'src/models/NominatimResponse';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  constructor(private httpClient: HttpClient) { }

  getCoordsForHappening(happening: Happenings): Observable<NominatimResponse[]> {
    const url = 'https://nominatim.openstreetmap.org/search?city='+happening.city+'&street='+happening.street_address+'&format=json';
    return this.httpClient.get<NominatimResponse[]>(url, {headers:{nominatim:"true"}});
  }
}
