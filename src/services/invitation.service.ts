import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../app-config';
import { ContactForm } from "../models/ContactForm";
import { Happenings, Invites } from '../models/happenings';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  constructor(private httpClient: HttpClient) { }

  getInvitation(uuid: string): Observable<Invites> {
    const url = API_BASE_URL + '/api/public/invitation/' + uuid;
    return this.httpClient.get<Invites>(url);
  }
  respondToInvitation(data: object, uuid: string): Observable<Invites> {
    const url = API_BASE_URL + '/api/public/invitation/' + uuid;
    return this.httpClient.post<Invites>(url, data);
  }

  getEvent(uuid: string){
    const url = API_BASE_URL + '/api/public/invitation/' + uuid + '/event';
    window.location.href = url;
  }
}
