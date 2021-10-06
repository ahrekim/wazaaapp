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
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateHappeningsComponent implements OnInit {

  happening: Happenings = new Happenings;
  form: FormGroup;

  constructor(
    private happeningService: HappeningService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToasterService,
    private modalController: ModalController
  ) {

  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  initFormGroup() {
    this.happening.invites = [];
    this.form = new FormGroup({
      happening_type: new FormControl(this.happening.happening_type, []),
      happening_name: new FormControl(this.happening.happening_name, [Validators.required]),
      happening_information: new FormControl(this.happening.happening_information, [Validators.required]),
      happening_starts: new FormControl(this.happening.happening_starts, [Validators.required]),
      happening_ends: new FormControl(this.happening.happening_ends_org, [Validators.required]),
      street_address: new FormControl(this.happening.street_address, [Validators.required]),
      zipcode: new FormControl(this.happening.zipcode, [Validators.required]),
      city: new FormControl(this.happening.city, [Validators.required])
    });
  }

  ngOnInit() {
    this.initFormGroup();
  }

  addInvite() {
    let invite = new Invites();
    invite.max_attendees = 1;
    this.happening.invites.push(invite);
  }

  deleteInvite(invite) {
    this.happening.invites.splice(invite, 1);
  }

  saveHappening() {

    // Set the form values to model
    this.happening.happening_type = this.form.getRawValue().happening_type;
    this.happening.happening_name = this.form.getRawValue().happening_name;
    this.happening.happening_information = this.form.getRawValue().happening_information;
    this.happening.happening_starts = this.form.getRawValue().happening_starts;
    this.happening.happening_ends = this.form.getRawValue().happening_ends;

    this.happening.street_address = this.form.getRawValue().street_address;
    this.happening.zipcode = this.form.getRawValue().zipcode;
    this.happening.city = this.form.getRawValue().city;

    this.happeningService.saveHappening(this.happening).subscribe(success => {
      let message = new ToastMessage();
      message.id = 1;
      message.message = "Tapahtuma tallenettu";
      message.type = "success";
      this.toast.addMessage(message);
      this.router.navigateByUrl("/auth/happenings");
    }, error => {
      // Error

    })
  }
}

