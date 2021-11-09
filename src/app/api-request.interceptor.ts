import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ApiRequestInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService, private navCtrl: NavController) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getAuthToken();

    let headers = req.headers;
    // Add token if found. All request (like login) dont have token.
    if (token && !req.headers.get("nominatim")) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }

    // Put app verion in headers
    //headers = headers.set('Version', APP_VERSION);

    // Clone the request and replace the original headers with cloned headers
    const apiReq = req.clone({ headers });
    

    // send cloned request with headers to the next handler.
    return next.handle(apiReq).pipe(catchError(err => {
      if(err.status === 401){
        this.authService.deleteUser();
        this.navCtrl.navigateRoot("/");
        return throwError("logout");
      }
      }));
  }
}
