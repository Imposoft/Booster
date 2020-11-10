import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeView} from '../views/home/home.view';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {RegisterView} from '../views/register/register.view';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ProfileView} from '../views/profile/profile.view';
import {RegisterProfileComponent} from '../components/register-profile/register-profile.component';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import {BandView} from '../views/band/band.view';
import {FanView} from '../views/fan/fan.view';
import {NavigationbarComponent} from '../components/navigationbar/navigationbar.component';
import {SocialLinksComponent} from '../components/social-links/social-links.component';
import {BandModificationView} from '../views/band-modification/band-modification.view';
import {ClassCheckerComponent} from '../components/class-checker/class-checker.component';
import {FanModificationView} from 'src/views/fan-modification/fan-modification.view';
import {TutorialView} from '../views/tutorial/tutorial.view';
import {TutorialModificationView} from 'src/views/tutorial-modification/tutorial-modification.view';
import {UserTutorialListingView} from '../views/user-tutorial-listing/user-tutorial-listing.view';
import {TutorialCreationView} from '../views/tutorial-creation/tutorial-creation.view';
import {LoginUserComponent} from '../components/login-user/login-user.component';
import {ProfileModificationView} from '../views/profile-modification/profile-modification.view';
import {NewsView} from '../views/news/news.view';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SocialAdderComponent} from '../components/social-adder/social-adder.component';
import {NewsContainerComponent} from '../components/news-container/news-container.component';

@NgModule({
    declarations: [
        /**  COMPONENTS  */
        AppComponent,
        RegisterProfileComponent,

        /** VIEWS */
        HomeView,
        RegisterView,
        ProfileView,
        BandView,
        BandModificationView,
        FanView,
        NavigationbarComponent,
        SocialLinksComponent,
        FanModificationView,
        TutorialView,
        TutorialModificationView,
        ClassCheckerComponent,
        UserTutorialListingView,
        TutorialCreationView,
        LoginUserComponent,
        ProfileModificationView,
        NewsView,
        SocialAdderComponent,
        NewsContainerComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
