import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ExampleComponentComponent} from '../components/example-component/example-component.component';
import {HomeView} from '../views/home/home.view';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RegisterMusicianComponent} from '../components/register-musician/register-musician.component';
import {RegisterView} from '../views/register/register.view';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ProfileView} from '../views/profile/profile.view';

@NgModule({
  declarations: [
    /**  COMPONENTS  */
    AppComponent,
    ExampleComponentComponent,
    RegisterMusicianComponent,

    /** VIEWS */
    HomeView,
    RegisterView,
    ProfileView
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
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
