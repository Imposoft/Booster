import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {debounceTime} from 'rxjs/operators';
import {Tutorial} from '../../models/tutorial/tutorial.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Musician} from '../../models/musician/musician.model';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.view.html',
  styleUrls: ['./tutorial.view.sass']
})
export class TutorialView implements OnInit {
  public tutorialPost: Tutorial;
  public tutorialOwner: Musician;
  private printedTutorialPost: any;

  public isButtonVisible = true;

  private _success = new Subject<string>();
  public successMessage = '';

  public pathId: string;
  public ownerPathId: string;
  private loggedId: string;
  private printedProfile: any;
  public isFan: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    // Clase particular vacia sobre el que cargar los datos
    this.tutorialPost = {body: '', exclusive: false, id: '', imgUrl: '', owner: undefined, price: 0, promoted: false, title: '', userWaitList: [], like: ['']};
    this.tutorialOwner = {description: '', email: '', genres: [], imageSource: '', instruments: [], jobOffers: [], location: '', name: '', password: '', phone: '', socialNetworks: [], subscription: undefined, subscriptionPrice: 0, tutorials: []};

    // Recibimos el id del url de la web o en su defecto utilizamos uno por defecto
    this.route.params.subscribe( params => {
        if (params.id) {
          this.pathId = params.id;
        } else {
          this.pathId = 'IG1rNplbyfMAmuCbTMdJ';
        }
        // Cargamos el perfil sobre el perfil vacio
        this.printedTutorialPost = afs.doc<Tutorial>('tutorialPosts/' + this.pathId);

        this.afAuth.authState.subscribe(user => {
        if (user){
          this.loggedId = user.uid;
          this.isFan = user.photoURL === 'FAN';
        }
        this.printedTutorialPost.valueChanges().subscribe((tutorial) => {
          this.tutorialPost = tutorial;
          // Cargamos el usuario owner de la clase
          this.printedProfile = afs.doc<Musician>('musicianProfiles/' + this.tutorialPost.owner);
          this.ownerPathId = this.tutorialPost.owner;
          this.printedProfile.valueChanges().subscribe((musician) => {
            this.tutorialOwner = musician;
          });
          this.checkIfApplied();
        });
      });
    });
  }

  ngOnInit(): void {
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(2500)
    ).subscribe(() => this.successMessage = '');
    this.checkIfApplied();
  }

  applyForTutorial(): void{
    this.isButtonVisible = false;
    this.tutorialPost.userWaitList.push(this.loggedId);
    this.printedTutorialPost.update(this.tutorialPost);
    this._success.next('Reserva solicitada con éxito! ');
  }

  checkIfApplied(): void {
    if (this.isFan) {
      for (const id of this.tutorialPost.userWaitList) {
        if (this.loggedId === id) {
          this.isButtonVisible = false;
        }
      }
    }
  }
}
