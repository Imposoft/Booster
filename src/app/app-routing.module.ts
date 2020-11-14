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
import {UserTutorialListingView} from '../views/user-tutorial-listing/user-tutorial-listing.view';
import {TutorialCreationView} from '../views/tutorial-creation/tutorial-creation.view';
import {ProfileModificationView} from '../views/profile-modification/profile-modification.view';
import {NewsView} from '../views/news/news.view';
import {JobOfferView} from '../views/job-offer/job-offer.view';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeView},
  {path: 'register', component: RegisterView},
  {path: 'profile', component: ProfileView},
  {path: 'profile/:id', component: ProfileView},
  {path: 'bandProfile', component: BandView},
  {path: 'bandProfile/:id', component: BandView},
  {path: 'fanProfile', component: FanView},
  {path: 'fanProfile/:id', component: FanView},
  {path: 'bandModification/:id', component: BandModificationView},
  {path: 'tutorial', component: TutorialView},
  {path: 'tutorial/:id', component: TutorialView},
  {path: 'tutorialCreation', component: TutorialCreationView},
  {path: 'tutorialModification/:id', component: TutorialModificationView},
  {path: 'userTutorialListing', component: UserTutorialListingView},
  {path: 'fanModification/:id', component: FanModificationView},
  {path: 'profileModification/:id', component: ProfileModificationView},
  {path: 'news', component: NewsView},
  {path: 'jobOffer', component: JobOfferView},
  {path: 'jobOffer/:id', component: JobOfferView}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
