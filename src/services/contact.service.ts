import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../app-config';
import { ContactForm } from "../models/ContactForm";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private httpClient: HttpClient) { }

  postContactForm(contactForm: ContactForm): Observable<ContactForm> {
    const url = API_BASE_URL + '/api/public/contactforms';

    return this.httpClient.post<ContactForm>(
      url,
      contactForm
    ).pipe(map((response: any) => {
      return response.data;
    }));
  }
}
