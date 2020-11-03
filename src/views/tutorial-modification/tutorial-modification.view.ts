import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {debounceTime} from 'rxjs/operators';
import {Tutorial} from '../../models/tutorial/tutorial.model';

@Component({
  selector: 'app-tutorial-modification',
  templateUrl: './tutorial-modification.view.html',
  styleUrls: ['./tutorial-modification.view.sass']
})
export class TutorialModificationView implements OnInit {
  tutorial: Tutorial;
  tutorialPosts;
  printedTutorial: any;
  modificationForm: FormGroup;

  private _success = new Subject<string>();
  successMessage = '';

  constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore) {
    this.printedTutorial = firestore.doc<Tutorial>('tutorialPosts/nWog3AOCpmhE3wDQcHNo');
    this.tutorial = this.printedTutorial.valueChanges();
  }

  ngOnInit(): void {
    this.modificationForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      userWaitList: ['', [Validators.required]],
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
      userWaitList: this.modificationForm.value.userWaitList,
      imgUrl: this.modificationForm.value.imageUrl,
      promoted: false,
      exclusive: false,
      owner: null
    };
    this.printedTutorial.update(tutorial)
      .catch(error => console.log(error));
    this._success.next('Clase particular guardada con exito!');
  }

}
