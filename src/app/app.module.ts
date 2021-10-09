import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPage } from './login/login.page';
import { AuthGuardGuard } from './auth-guard.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HomePage } from './home/home.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateHappeningsComponent } from './create/create.component';
import { DatePipe } from '@angular/common';
import { ApiRequestInterceptor } from './api-request.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    HomePage,
    NavbarComponent,
    CreateHappeningsComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LeafletModule,
  ],
  providers: [
    DatePipe,
    Geolocation,
    AuthGuardGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: ApiRequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
