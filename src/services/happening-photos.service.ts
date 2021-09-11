import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../app-config';
import { ContactForm } from "../models/ContactForm";
import { UploadedImage } from '../models/UploadedImage';

@Injectable({
  providedIn: 'root'
})
export class HappeningPhotosService {
  constructor(private httpClient: HttpClient) { }

  postPhoto(form: any, happeningUuid: string): Observable<any> {
    const url = API_BASE_URL + '/api/public/happening/'+ happeningUuid +'/photo';
    return this.httpClient.post(url, form);
  }

  getPhotos(happeningUuid: string): Observable<UploadedImage[]> {
    const url = API_BASE_URL + '/api/happening/'+ happeningUuid +'/photos';
    return this.httpClient.get<UploadedImage[]>(url);
  }

  deletePhoto(photoFilename: string): Observable<any>{
    const url = API_BASE_URL + '/api/auth/photos/' + photoFilename;
    return this.httpClient.delete(url);
  }
}
