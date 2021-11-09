import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../config';
import { ContactForm } from "../models/ContactForm";
import { LoginForm, User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticated = new BehaviorSubject(false);
  userLoggedIn = this.authenticated.asObservable();

  constructor(private httpClient: HttpClient) {
    this.authenticated.next(this.isLoggedIn());
  }

  postLoginForm(loginForm: LoginForm): Observable<User> {
    const url = API_BASE_URL + '/api/public/login';

    return this.httpClient.post<User>(
      url,
      loginForm
    );
  }

  getAuthToken() {
    if(this.isLoggedIn()){
      return this.getStoredUser().token;
    }
  }

  isLoggedIn(){
    if(localStorage.getItem("user")){
      return true;
    } else {
      return false;
    }
  }

  getStoredUser(){
    var user: User = JSON.parse(localStorage.getItem("user"));
    return user;
  }
ß
  setStoredUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
    this.authenticated.next(this.isLoggedIn());
  }

  deleteUser() {
    localStorage.removeItem("user");
    this.authenticated.next(this.isLoggedIn());
  }
}
