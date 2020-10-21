import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeView} from '../views/home/home.view';
import {RegisterView} from '../views/register/register.view';
import {ProfileView} from '../views/profile/profile.view';
import {BandView} from '../views/band/band.view';
import {FanView} from '../views/fan/fan.view';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeView},
  {path: 'register', component: RegisterView},
  {path: 'profile', component: ProfileView},
  {path: 'bandProfile', component: BandView},
  {path: 'fanProfile', component: FanView},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
