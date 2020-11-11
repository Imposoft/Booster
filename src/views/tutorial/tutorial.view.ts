import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {debounceTime} from 'rxjs/operators';
import {Tutorial} from '../../models/tutorial/tutorial.model';
import {UserDetails} from '../../models/userDetails/user-details.model';
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
  private fanDetails: UserDetails;

  public ButtonVisible = true;

  private _success = new Subject<string>();
  public successMessage = '';

  public pathId: string;
  public userPathId: string;
  private loggedId: string;
  private printedProfile: any;
  private isFan: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    // Clase particular vacia sobre el que cargar los datos
    this.tutorialPost = {body: '', exclusive: false, id: '', imgUrl: '', owner: undefined, price: 0, promoted: false, title: '', userWaitList: []};
    this.tutorialOwner = {description: '', email: '', genres: [], imageSource: '', instruments: [], jobOffers: [], location: '', name: '', password: '', phone: '', socialNetworks: [], subscription: undefined, subscriptionPrice: 0, tutorials: []};

    // Recibimos el id del url de la web o en su defecto utilizamos uno por defecto
    this.route.params.subscribe( params => {
        if (params.id) {
          this.pathId = params.id;
        } else {
          this.pathId = 'IG1rNplbyfMAmuCbTMdJ';
        }
        // Cargamos el perfil sobre el perfil vacio
        this.printedProfile = afs.doc<Tutorial>('tutorialPosts/' + this.pathId);
        this.printedProfile.valueChanges().subscribe((tutorial) => {
          this.tutorialPost = tutorial;
        });
      }
    );

    // Cargamos el usuario owner de la clase
    this.printedProfile = afs.doc<Musician>('musicianProfiles/IfcscpI7GL2pFaZKEccf');
    this.userPathId = 'IfcscpI7GL2pFaZKEccf';
    this.printedProfile.valueChanges().subscribe((musician) => {
      this.tutorialOwner = musician;
    });

    this.afAuth.authState.subscribe(user => {
      if (user){
        this.loggedId = user.uid;
        if (user.photoURL === 'FAN' && !this.checkIfApplied()) {
          this.isFan = true;
        } else {
          this.isFan = false;
        }
      }
      else{

      }
    });
  }

  ngOnInit(): void {
    this.fanDetails = {
      contact: '1231231312',
      id: 'IfcscpI7GL2pFaZKEccf',
      imageurl: 'https://image.freepik.com/free-vector/woman-avatar-profile-round-icon_24640-14042.jpg',
      name: 'Juan Carlos'
    };

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(2500)
    ).subscribe(() => this.successMessage = '');
  }

  applyForTutorial(): void{
    // TODO Change for logged user
    this.tutorialPost.userWaitList.push(this.loggedId);
    this.printedProfile.update(this.tutorialPost);
    this._success.next('Reserva solicitada con exito! ');
  }

  checkIfApplied(): boolean {
    for (const id of this.tutorialPost.userWaitList) {
      if (this.loggedId === id) {
        return true;
      }
    }
  }
}
