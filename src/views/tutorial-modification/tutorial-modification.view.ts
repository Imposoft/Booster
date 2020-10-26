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
    this.tutorialPosts = firestore.collection<Tutorial>('tutorialPosts');
    this.printedTutorial = firestore.doc<Tutorial>('tutorialPosts/nWog3AOCpmhE3wDQcHNo');
    this.tutorial = this.printedTutorial.valueChanges();
  }

  ngOnInit(): void {
    this.modificationForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      userWaitList: ['', [Validators.required]]
    });
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');
  }

  sendForm(): void {
    const tutorial = {
      title: this.modificationForm.value.title,
      description: this.modificationForm.value.description,
      price: this.modificationForm.value.price,
      userWaitList: this.modificationForm.value.userWaitList
    };
    this.tutorialPosts.add(tutorial);
    this._success.next('Clase particular guardada con exito!');
  }

}
