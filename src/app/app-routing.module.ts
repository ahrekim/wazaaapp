import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { CreateHappeningsComponent } from './create/create.component';
import { HappeningComponent } from './happening/happening.component';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { MeComponent } from './me/me.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'navbar',
    pathMatch: 'full'
  },
  {path: 'login', component: LoginPage},
  {path: 'navbar', component: NavbarComponent, canActivate:[AuthGuardGuard], children: [
    {path: 'home', component: HomePage, canActivate:[AuthGuardGuard]},
    {path: 'invites', component: MeComponent, canActivate:[AuthGuardGuard]},
    {path: 'me', component: MeComponent, canActivate:[AuthGuardGuard]},
  ]},
  {path:'happening/:uuid', component: HappeningComponent, canActivate:[AuthGuardGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
