import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/User';
import { AuthenticationService } from 'src/services/authentication.service';
import { ToasterService } from 'src/services/toaster.service';
import { HappeningService } from 'src/services/happening.service';
import { Happenings } from 'src/models/happenings';
import { Invites } from 'src/models/happenings';
import { ToastMessage } from 'src/models/ToastMessage';
import { ModalController, NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { CreateHappeningsComponent } from '../create/create.component';

@Component({
  selector: 'me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent {

  happenings: Happenings[];

  constructor(
    private authService: AuthenticationService,
    private api: HappeningService,
    private navCtrl: NavController,
    private modalController: ModalController
  ) {
  }

  async createHappening() {
    const modal = await this.modalController.create({
      component: CreateHappeningsComponent,
      cssClass: 'my-custom-class'
    });

    modal.onDidDismiss().then(() => {
      this.ionViewWillEnter();
    })
    return await modal.present();
  }

  ionViewWillEnter() {
    this.api.getHappenings().subscribe(happenings => {
      this.happenings = happenings;
    });
  }

  logout(){
    this.authService.deleteUser();
    this.navCtrl.navigateRoot('/');
  }
}

