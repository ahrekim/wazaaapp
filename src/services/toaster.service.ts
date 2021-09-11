import { Injectable } from '@angular/core';
import { ToastMessage } from '../models/ToastMessage';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToasterService {
    toastId = 1;
    toasterMessages: ToastMessage[] = [];
    constructor(
        private toastController: ToastController
    ) { }

    async addMessage(message: ToastMessage) {
        
        const toast = await this.toastController.create({
            message: message.message,
            duration: 2000
          });
          toast.present();
    }
}
