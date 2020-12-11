import { Component, OnInit } from '@angular/core';
import {Band} from '../../models/band/band.model';
import {Observable, Subject} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {ActivatedRoute, Router} from '@angular/router';
import {UserDetails} from '../../models/userDetails/user-details.model';
import {Musician} from '../../models/musician/musician.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-band',
  templateUrl: './band.view.html',
  styleUrls: ['./band.view.sass']
})
export class BandView implements OnInit {
  public profile: Band;
  public member: Musician;
  private printedProfile: any;
  private printedMember: any;
  public pathId: string;
  private loggedId: string;

  musicians: Observable<Musician[]>;
  realMusicians: Musician[];
  filter = new FormControl('');
  refresh: Subject<any> = new Subject();

  membersToShow: Musician[];
  public postList: any;
  public shown = false;

  constructor(private router: Router, private route: ActivatedRoute, firestore: AngularFirestore, public afAuth: AngularFireAuth) {
    // Perfil vacio sobre el que cargar los datos
    this.profile = {auditions: [undefined], description: '', email: '', genres: [], imageSource: '', jobOffers: [undefined], location: '', members: [], name: '', password: '', phone: '', socialNetworks: [], subscription: undefined, subscriptionPrice: 0};
    this.member = { description: '', email: '', genres: [], id: '', imageSource: '', instruments: [], jobOffers: [], location: '', name: '', password: '', phone: '', reservations: [], socialNetworks: [], subscription: undefined, subscriptionPrice: 0, tutorials: [] };
   // this.membersToShow = [];

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
        this.postList = firestore.collection('posts', ref => ref.where('owner', '==', this.pathId)).valueChanges({ idField: 'id' });
        // Cargamos el perfil sobre el perfil vacio
        this.printedProfile = firestore.doc<Band>('bandProfiles/' + this.pathId);
        this.printedProfile.valueChanges().subscribe((band) => {
          this.profile = band;
          this.membersToShow = [];
          for (const item of this.profile.members) {
            console.log(item);
            // @ts-ignore
            this.printedMember = firestore.doc<Musician>('musicianProfiles/' + item);
            this.printedMember.valueChanges().subscribe((musician) => {
              this.member = musician;
              this.membersToShow.push(this.member);
            });
          }
        });

        this.musicians = firestore.collection<Musician>('musicianProfiles').valueChanges({idField: 'id'});
        this.musicians.subscribe(value => this.realMusicians = value);

        this.filter.valueChanges.subscribe( text => {
          this.musicians.pipe(
            map(users => users.filter(user => user.name.toLowerCase().includes(text.toLowerCase())))
          ).subscribe(value => this.realMusicians = [...value]);
        }
      );
      }
    );
  }

  ngOnInit(): void {
  }

  userLoggedIsProfileOwner(): boolean {
    return this.loggedId === this.pathId;
  }

  showAddMembers(): void {
    this.shown = !this.shown;
  }

  addMember(id: string): void {
    this.profile.members.push(id);
    this.printedProfile.update(this.profile)
      .catch(error => console.log(error));
    setTimeout(() => this.refresh.next(), 1000);
  }
}
