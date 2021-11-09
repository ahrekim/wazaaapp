import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContactForm } from "../models/ContactForm";
import { Happenings, Invites } from '../models/happenings';
import { API_BASE_URL } from 'src/config';

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
  
  getMyInvitations(){
    const url = API_BASE_URL + '/api/auth/invitations/';
    return this.httpClient.get<Invites[]>(url);
  }

  getEvent(uuid: string){
    const url = API_BASE_URL + '/api/public/invitation/' + uuid + '/event';
    window.location.href = url;
  }
}
