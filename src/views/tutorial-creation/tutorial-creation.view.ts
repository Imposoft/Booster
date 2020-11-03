import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {Tutorial} from '../../models/tutorial/tutorial.model';

@Component({
  selector: 'app-tutorial-creation',
  templateUrl: './tutorial-creation.view.html',
  styleUrls: ['./tutorial-creation.view.sass']
})
export class TutorialCreationView implements OnInit {
  tutorialPosts;
  modificationForm: FormGroup;

  private _success = new Subject<string>();
  successMessage = '';

  constructor(private formBuilder: FormBuilder, private afs: AngularFirestore) {
    this.tutorialPosts = afs.collection<Tutorial>('tutorialPosts');
  }

  ngOnInit(): void {
    this.modificationForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', []],
      price: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]]
    });
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');
  }

  sendForm(): void {
    const tutorial = {
      title: this.modificationForm.value.title,
      body: this.modificationForm.value.description,
      price: this.modificationForm.value.price,
      imgUrl: this.modificationForm.value.imageUrl,
      promoted: false,
      exclusive: false,
      owner: null,
      userWaitList: []
    };
    this.tutorialPosts.add(tutorial);
    this._success.next('Clase creada con exito!');
  }
}
