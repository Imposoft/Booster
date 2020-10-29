import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profile, SocialNetwork} from '../../models/profile/profile.model';
import {debounceTime} from 'rxjs/operators';
import {Tutorial} from '../../models/tutorial/tutorial.model';
import {UserDetails} from '../../models/userDetails/user-details.model';
import {Band} from '../../models/band/band.model';
import {SocialNetworkEnum} from '../../models/socialnetworks/socialnetworks.model';
import {Fan} from '../../models/fan/fan.model';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.view.html',
  styleUrls: ['./tutorial.view.sass']
})
export class TutorialView implements OnInit {
  tutorial;
  tutorialPosts;
  modificationForm: FormGroup;

  private _success = new Subject<string>();
  successMessage = '';

  constructor(private formBuilder: FormBuilder, private afs: AngularFirestore) {
    this.tutorial = afs.collection('tutorial');
  constructor(private formBuilder: FormBuilder, private afs: AngularFirestore){
    this.tutorialPosts = afs.collection<Tutorial>('tutorialPosts');
  }
    ngOnInit(): void {
      this.modificationForm = this.formBuilder.group({
        tittle: ['', [Validators.required]],
        description: ['', []],
        price: ['', [Validators.required]]
      });
      this._success.subscribe(message => this.successMessage = message);
      this._success.pipe(
        debounceTime(5000)
      ).subscribe(() => this.successMessage = '');
    }
  sendForm(): void {
    const tutorial = {
      tittle: this.modificationForm.value.title,
      title: this.modificationForm.value.title,
      description: this.modificationForm.value.description,
      price: this.modificationForm.value.price
      price: this.modificationForm.value.price,
    };
    this.tutorial.add(tutorial);
    this.tutorialPosts.add(tutorial);
    this._success.next('Clase creada con exito!');
  }
}
