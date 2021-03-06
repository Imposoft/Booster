import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Musician} from '../../models/musician/musician.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.view.html',
  styleUrls: ['./profile.view.sass']
})
export class ProfileView implements OnInit {
  public profile: Musician;
  private printedProfile: any;
  public pathId: string;
  private loggedId: string;
  public postList: any;

  private finalUrl: any;
  public profPic: any;

  constructor(private router: Router, private route: ActivatedRoute, firestore: AngularFirestore, public afAuth: AngularFireAuth, public storage: AngularFireStorage) {
    // Perfil vacio sobre el que cargar los datos
    this.profile = {description: '', email: '', genres: [], imageSource: '', instruments: [], jobOffers: [], location: '', name: '', password: '', phone: '', socialNetworks: [], subscriptionPrice: 0, tutorials: [], reservations: []};

    // Recibimos el id del url de la web o en su defecto utilizamos uno por defecto
    this.route.params.subscribe( params => {
      if (params.id) {
        this.pathId = params.id;
      } else {
        this.pathId = 'UtxF06b0F6RBkX0zIAKrGtjAqzt2';
      }
      // Si hemos iniciado sesion, loggedId sera nuestro id
      this.afAuth.authState.subscribe(user => {
        if (user){
          this.loggedId = user.uid;
        }
      });
      this.postList = firestore.collection('posts', ref => ref.where('owner', '==', this.pathId)).valueChanges({ idField: 'id' });
      // Cargamos el perfil sobre el perfil vacio
      this.printedProfile = firestore.doc<Musician>('musicianProfiles/' + this.pathId);
      this.printedProfile.valueChanges().subscribe((musician) => {
        this.profile = musician;
        const ref = this.storage.ref(this.profile.imageSource);
        this.finalUrl = ref.getDownloadURL().subscribe(url => {
          this.profPic = url;
        });
      });
    });
  }

  ngOnInit(): void {
  }

  userLoggedIsProfileOwner(): boolean {
    return this.loggedId === this.pathId;
  }
}
