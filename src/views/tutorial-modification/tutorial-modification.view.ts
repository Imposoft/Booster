import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {debounceTime} from 'rxjs/operators';
import {Tutorial} from '../../models/tutorial/tutorial.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-tutorial-modification',
  templateUrl: './tutorial-modification.view.html',
  styleUrls: ['./tutorial-modification.view.sass']
})
export class TutorialModificationView implements OnInit {
  public tutorial: Tutorial;
  private printedTutorial: any;
  public modificationForm: FormGroup;
  public exclusive = false;
  public promoted = false;
  private pathId: string;

  private _success = new Subject<string>();
  successMessage = '';
  public loggedId: string;
  public noPathID = false;

  constructor(private formBuilder: FormBuilder,
              private firestore: AngularFirestore,
              private router: Router,
              private route: ActivatedRoute,
              public afAuth: AngularFireAuth) {
    // Perfil vacio sobre el que cargar los datos
    this.tutorial = {body: '', exclusive: false, imgUrl: '', owner: '', promoted: false, title: '', userWaitList: [], price: 0};

    // Recibimos el id del url de la web o en su defecto utilizamos uno por defecto
    this.route.params.subscribe( params => {
      if (params.id) {
        this.pathId = params.id;
        console.log('pathId = ' + this.pathId);
        this.printedTutorial = firestore.doc<Tutorial>('tutorialPosts/' + this.pathId);
        this.printedTutorial.valueChanges().subscribe((tutorial) => {
          this.tutorial = tutorial;
        });
      } else {
        this.noPathID = true;
      }/*else {
        this.pathId = 'nWog3AOCpmhE3wDQcHNo';
      }
      this.printedTutorial = firestore.doc<Tutorial>('tutorialPosts/' + this.pathId);
      this.printedTutorial.valueChanges().subscribe((tutorial) => {
        this.tutorial = tutorial;
      });*/
      // Si hemos iniciado sesion, loggedId sera nuestro id
      this.afAuth.authState.subscribe(user => {
        if (user){
          this.loggedId = user.uid;
        }
      });
      // this.tutorial = this.printedTutorial.valueChanges();
    });
  }

  ngOnInit(): void {
    console.log('onInit pathId = ' + this.pathId);
    if (this.pathId !== undefined){
      console.log('es distinto de undefined');
      this.exclusive = this.tutorial.exclusive;
      this.promoted = this.tutorial.promoted;
    }
    this.modificationForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]]
    });
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');
  }

  sendForm(): void {
    this.checkValues();
    if (this.pathId !== undefined) {
      this.printedTutorial.update(this.tutorial)
        .catch(error => console.log(error));
      this._success.next('Clase particular guardada con exito!');
    } else {
      this.printedTutorial = this.firestore.collection<Tutorial>('tutorialPosts');
      this.pathId = '';
      this.tutorial.owner = this.loggedId;
      this.printedTutorial.add(this.tutorial)
        .catch(error => console.log(error));
      this._success.next('Clase particular creada con exito!');
    }
    this.changeView();
  }

  checkValues(): void {
    if (this.modificationForm.value.title !== ''){ this.tutorial.title = this.modificationForm.value.title; }
    if (this.modificationForm.value.imageUrl !== ''){ this.tutorial.imgUrl = this.modificationForm.value.imageUrl; }
    if (this.modificationForm.value.description !== ''){ this.tutorial.body = this.modificationForm.value.description; }
    if (this.modificationForm.value.price !== ''){ this.tutorial.price = this.modificationForm.value.price; }
    this.tutorial.promoted = this.promoted;
    this.tutorial.exclusive = this.exclusive;
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
    this.router.navigate(['profile/' + this.loggedId]);
  }
}
