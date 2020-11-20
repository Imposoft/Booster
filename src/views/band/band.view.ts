import { Component, OnInit } from '@angular/core';
import {Band} from '../../models/band/band.model';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute, Router} from '@angular/router';
import {UserDetails} from '../../models/userDetails/user-details.model';
import {Musician} from '../../models/musician/musician.model';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-band',
  templateUrl: './band.view.html',
  styleUrls: ['./band.view.sass']
})
export class BandView implements OnInit {
  public profile: Band;
  private printedProfile: any;
  public pathId: string;
  private loggedId: string;

  members: Musician[];
  public postList: any;

  constructor(private router: Router, private route: ActivatedRoute, firestore: AngularFirestore, public afAuth: AngularFireAuth) {
    // Perfil vacio sobre el que cargar los datos
    this.profile = {auditions: [undefined], description: '', email: '', genres: [], imageSource: '', jobOffers: [undefined], location: '', members: [], name: '', password: '', phone: '', socialNetworks: [], subscription: undefined, subscriptionPrice: 0};

    // Recibimos el id del url de la web o en su defecto utilizamos uno por defecto
    this.route.params.subscribe( params => {
        if (params.id) {
          this.pathId = params.id;
        } else {
          this.pathId = 'n6ZhZ1TJI7iayJS4GQrc';
        }
        // Si hemos iniciado sesion, loggedId sera nuestro id
        this.afAuth.authState.subscribe(user => {
          if (user){
            this.loggedId = user.uid;
          }
        });
        this.postList = firestore.collection('posts', ref => ref.where('owner', '==', this.pathId)).valueChanges();
        // Cargamos el perfil sobre el perfil vacio
        this.printedProfile = firestore.doc<Band>('bandProfiles/' + this.pathId);
        this.printedProfile.valueChanges().subscribe((band) => {
          this.profile = band;
        });
      }
    );
  }

  ngOnInit(): void {
  }

  userLoggedIsProfileOwner(): boolean {
    return this.loggedId === this.pathId;
  }
}
