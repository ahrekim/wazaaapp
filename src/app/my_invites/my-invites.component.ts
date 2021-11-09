import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/User';
import { AuthenticationService } from 'src/services/authentication.service';
import { ToasterService } from 'src/services/toaster.service';
import { HappeningService } from 'src/services/happening.service';
import { Happenings } from 'src/models/happenings';
import { Invites } from 'src/models/happenings';
import { ToastMessage } from 'src/models/ToastMessage';
import { ModalController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { InvitationService } from 'src/services/invitation.service';

@Component({
  selector: 'my-invites',
  templateUrl: './my-invites.component.html',
  styleUrls: ['./my-invites.component.css']
})
export class MyInvitesComponent {

  invites: Invites[]
 
  constructor(
    private happeningService: HappeningService,
    private inviteService: InvitationService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToasterService,
    private modalController: ModalController,
    private datePipe: DatePipe,
  ) {
  }

  ionViewWillEnter(){
    // Get invites linked to logged in user
    this.inviteService.getMyInvitations().subscribe(invites => {
      this.invites = invites;
    })
  }
}

