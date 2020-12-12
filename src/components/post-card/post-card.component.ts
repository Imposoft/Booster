import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/post/post.model';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireAuth} from '@angular/fire/auth';
import {FormGroup} from '@angular/forms';
import {Musician} from '../../models/musician/musician.model';
import {Profile} from '../../models/profile/profile.model';
import {BandModificationView} from '../../views/band-modification/band-modification.view';
import {Band} from '../../models/band/band.model';
import {Fan} from '../../models/fan/fan.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.sass']
})
export class PostCardComponent implements OnInit {
  @Input() postToDisplay: Post;
  @Input() isOwner: boolean;
  commentsShown: boolean;
  public firestore: AngularFirestore;
  public loggedId: string;
  comment: FormGroup;
  public musico: any;
  public banda: any;
  public fan: any;

  constructor(firestore: AngularFirestore, private router: Router, public afAuth: AngularFireAuth) {
    this.musico = {description: '', email: '', genres: [], imageSource: '', instruments: [], jobOffers: [], location: '', name: '', password: '', phone: '', socialNetworks: [], subscriptionPrice: 0, tutorials: [], reservations: []};
    this.firestore = firestore;
    this.loggedId = '';
    // Si hemos iniciado sesion, loggedId sera nuestro id
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.loggedId = user.uid;
      }
    });
    // Cargar aqui los datos

  }

  ngOnInit(): void {
  }

  delete(): void {
    this.firestore.collection('posts').doc(this.postToDisplay.id).delete();
  }

  modifyPost(): void{
    this.router.navigate(['news/' + this.postToDisplay.id]);
  }

  toggleVisible(): void{
    console.log(this.loggedId);
    this.commentsShown = !this.commentsShown;
  }

  userLoggedIsProfileOwner(): boolean {
    return this.loggedId !== '';
  }

  obtenerNombre(id: string, rol: string): any {
    if (rol === 'MUSICIAN') {
      this.musico = this.firestore.doc<Musician>('musicianProfiles/' + id);
      // this.musico = this.firestore.collection<Musician>('musicianProfiles').doc(id).valueChanges();
      return(this.musico.name);
    }
    if (rol === 'BAND') {
      this.musico = this.firestore.doc<Band>('bandProfiles/' + id);
      // this.musico = this.firestore.collection<Musician>('musicianProfiles').doc(id).valueChanges();
      return(this.musico.name);
    }
    if (rol === 'FAN') {
      this.musico = this.firestore.doc<Fan>('fanProfiles/' + id);
      // this.musico = this.firestore.collection<Musician>('musicianProfiles').doc(id).valueChanges();
      return(this.musico.name);
    }
  }
}
