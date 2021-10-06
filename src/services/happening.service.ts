import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContactForm } from "../models/ContactForm";
import { LoginForm, User } from '../models/User';
import { Happenings } from '../models/happenings';
import { API_BASE_URL } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class HappeningService {
  constructor(private httpClient: HttpClient) { }

  me(): Observable<User> {
    const url = API_BASE_URL + '/api/auth/me';
    return this.httpClient.get<User>(url);
  }
  
  getHappenings()
  {
    const url = API_BASE_URL + '/api/auth/happenings';
    return this.httpClient.get<Happenings[]>(url);
  }
  
  getHappening(uuid: string)
  {
    const url = API_BASE_URL + '/api/auth/happenings/' + uuid;
    return this.httpClient.get<Happenings>(url);
  }
  
  saveHappening(data: Happenings){
    const url = API_BASE_URL + '/api/auth/happenings';
    return this.httpClient.post<Happenings>(url, data);
  }
  
  deleteHappening(uuid: string){
    const url = API_BASE_URL + '/api/auth/happenings/' + uuid;
    return this.httpClient.delete(url);
  }
  
  changePassword(data: object){
    const url = API_BASE_URL + '/api/auth/password';
    return this.httpClient.patch(url, data);
  }
}