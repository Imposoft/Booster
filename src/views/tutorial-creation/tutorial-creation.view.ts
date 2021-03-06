import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {Tutorial} from '../../models/tutorial/tutorial.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tutorial-creation',
  templateUrl: './tutorial-creation.view.html',
  styleUrls: ['./tutorial-creation.view.sass']
})
export class TutorialCreationView implements OnInit {
  tutorialPosts;
  modificationForm: FormGroup;

  private loggedId: string;
  public ownerID: string;
  public isMusician: boolean;

  private _success = new Subject<string>();
  successMessage = '';
  private exclusive = false;
  private promoted = false;

  constructor(private formBuilder: FormBuilder, private afs: AngularFirestore, public afAuth: AngularFireAuth, private router: Router) {
    this.tutorialPosts = afs.collection<Tutorial>('tutorialPosts');
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.loggedId = user.uid;
        this.ownerID = this.loggedId;
        this.isMusician = user.photoURL === 'MUSICIAN';
      }
    });
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
      promoted: this.promoted,
      exclusive: this.exclusive,
      owner: this.loggedId,
      userWaitList: []
    };
    this.tutorialPosts.add(tutorial);
    this._success.next('Clase creada con exito!');
    this.changeView();
  }

  toggleExclusive(b: boolean): void {
    console.log(b);
    this.exclusive = b;
  }
  togglePromoted(b: boolean): void {
    console.log(b);
    this.promoted = b;
  }

  changeView(): void {
    this.successMessage = '';
    this.router.navigate(['fanProfile/' + this.loggedId]);
  }
}
