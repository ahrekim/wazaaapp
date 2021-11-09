import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';
import { LoginPage } from './login/login.page';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private modalController: ModalController
  ){}

  async openLogin() {

    // Open modal and pass on invite
    const modal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'my-custom-class',
      componentProps: {
        //
      }
    });

    modal.onDidDismiss().then(() => {
      //
    })
    return await modal.present();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authService.isLoggedIn()){
        this.authService.deleteUser();
        this.openLogin();
    }
    return this.authService.isLoggedIn();
  }
}
