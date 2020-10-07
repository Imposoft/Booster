import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {ExampleComponentComponent} from '../components/example-component/example-component.component';
import {HomeView} from '../views/home/home.view';

@NgModule({
  declarations: [
    /**  COMPONENTS  */
    AppComponent,
    ExampleComponentComponent,

    /** VIEWS */
    HomeView,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
