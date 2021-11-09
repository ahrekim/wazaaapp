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

@Component({
  selector: 'invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  @Input() invite: Invites;
  @Input() happening_uuid: string;
  form: FormGroup;

  constructor(
    private happeningService: HappeningService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToasterService,
    private modalController: ModalController,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit(){
    this.initFormGroup();
  }

  initFormGroup() {
    this.form = new FormGroup({
      invitation_name: new FormControl(this.invite.invitation_name, [Validators.required]),
      max_attendees: new FormControl(this.invite.max_attendees, [Validators.required]),
      invitee_email: new FormControl(this.invite.invitee_email, [Validators.email, Validators.required]),
    });
  }

  saveInvite() {
    // Set the form values to model
    this.invite.invitation_name = this.form.getRawValue().invitation_name;
    this.invite.max_attendees = this.form.getRawValue().max_attendees;
    this.invite.invitee_email = this.form.getRawValue().invitee_email;
    // Save the invite
    this.happeningService.saveInvite(this.invite, this.happening_uuid).subscribe(success => {
      this.toast.addMessage("Invite saved");
    }, error => {
      // Error
      this.toast.addMessage("Error saving invite");
    })
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}

