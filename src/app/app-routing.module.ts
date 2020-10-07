import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeView} from '../views/home/home.view';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeView},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
