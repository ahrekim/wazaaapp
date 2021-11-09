import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/models/User';
import { AuthenticationService } from 'src/services/authentication.service';
import { ToasterService } from 'src/services/toaster.service';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
})
export class NavbarComponent implements OnInit{

  loggedIn: boolean = false;


  constructor(
    public toaster: ToasterService,
    private router: Router,
    private authService: AuthenticationService
  ){
    this.authService.userLoggedIn.subscribe(status => {
      this.loggedIn = status;
    });
  }

  ngOnInit() {
    this.router.navigateByUrl("/navbar/home");
    // Cheeck if logged in
    this.loggedIn = this.authService.isLoggedIn();
  }
  
  onSubmit() {
  }
}
