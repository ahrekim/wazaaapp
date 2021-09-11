import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/models/User';
import { AuthenticationService } from 'src/services/authentication.service';
import { ToasterService } from 'src/services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  form: FormGroup;
  formLocked: boolean = true;


  constructor(
    private authenticationService: AuthenticationService,
    public toaster: ToasterService,
    private router: Router
  ){
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    if(this.authenticationService.isLoggedIn()){
      this.router.navigateByUrl("/home");
    }
  }
  
  onSubmit() {
    this.form.disable();
    const data = {
      email: this.form.value.email,
      password: this.form.value.password,
    } as LoginForm;
    
    //Send the data to backend
    this.authenticationService.postLoginForm(
      data
      ).subscribe(
        user => {
          this.toaster.addMessage({id: null, message: "Logged in!", type: "success"});
          console.log(user);
          this.authenticationService.setStoredUser(user);
          // redirect to auth routes
          this.router.navigateByUrl("/auth/dashboard");
        },
        error => {
          this.toaster.addMessage({id: null, message: "Login failed", type: "danger"});
          console.log(error.message);
          this.form.enable();
      }
    );
  }

}
