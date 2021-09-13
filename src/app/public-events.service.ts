import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/config';
import { Happenings, Invites } from 'src/models/happenings';

@Injectable({
  providedIn: 'root'
})
export class PublicEventsService {

  constructor(private httpClient: HttpClient) { }

  getPublicEvents(): Observable<Happenings[]> {
    const url = API_BASE_URL + '/api/public/events';
    return this.httpClient.get<Happenings[]>(url);
  }
}
