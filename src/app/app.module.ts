import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ExampleComponentComponent} from '../components/example-component/example-component.component';
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

@NgModule({
  declarations: [
    /**  COMPONENTS  */
    AppComponent,
    ExampleComponentComponent,
    RegisterProfileComponent,

    /** VIEWS */
    HomeView,
    RegisterView,
    ProfileView,
    BandView,
    FanView
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
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
