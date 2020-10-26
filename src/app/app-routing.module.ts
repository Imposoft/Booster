import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeView} from '../views/home/home.view';
import {RegisterView} from '../views/register/register.view';
import {ProfileView} from '../views/profile/profile.view';
import {BandView} from '../views/band/band.view';
import {FanView} from '../views/fan/fan.view';
import {BandModificationView} from '../views/band-modification/band-modification.view';
import {FanModificationView} from '../views/fan-modification/fan-modification.view';
import {TutorialView} from '../views/tutorial/tutorial.view';
import {TutorialModificationView} from '../views/tutorial-modification/tutorial-modification.view';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeView},
  {path: 'register', component: RegisterView},
  {path: 'profile', component: ProfileView},
  {path: 'bandProfile', component: BandView},
  {path: 'fanProfile', component: FanView},
  {path: 'bandModification', component: BandModificationView},
  {path: 'tutorial', component: TutorialView},
  {path: 'tutorialModification', component: TutorialModificationView},
  {path: 'fanModification', component: FanModificationView}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
