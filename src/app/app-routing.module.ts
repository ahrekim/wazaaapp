import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { CreateHappeningsComponent } from './create/create.component';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'navbar',
    pathMatch: 'full'
  },
  {path: 'login', component: LoginPage},
  {path: 'navbar', component: NavbarComponent, canActivate:[AuthGuardGuard], children: [
    {path: 'home', component: HomePage, canActivate:[AuthGuardGuard]}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
