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


  constructor(
    public toaster: ToasterService,
    private router: Router
  ){
  }

  ngOnInit() {
    this.router.navigateByUrl("/navbar/home");
  }
  
  onSubmit() {
  }
}
