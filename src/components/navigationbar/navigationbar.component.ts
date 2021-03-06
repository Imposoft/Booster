import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Musician} from '../../models/musician/musician.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Fan} from '../../models/fan/fan.model';
import {Band} from '../../models/band/band.model';
import {Profile} from '../../models/profile/profile.model';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.sass']
})
export class NavigationbarComponent implements OnInit {

  public loggedId: string;
  private role: string;
  private printedProfile: any;
  private profile: Profile;
  public imageURL = 'assets/fan/avatar-man.jpg';

  private finalUrl: any;

  constructor(public afAuth: AngularFireAuth, private route: ActivatedRoute, private afs: AngularFirestore, private router: Router, public storage: AngularFireStorage) {
    // Perfil vacio sobre el que cargar los datos
    this.profile = {email: '', imageSource: '', location: '', name: '', password: '', phone: '', socialNetworks: []};
    // this.imageURL = 'assets/fan/avatar-man.jpg';

    this.afAuth.authState.subscribe(user => {
      if (user){
        this.loggedId = user.uid;
        this.role = user.photoURL;
        console.log('user autheticated: id = ' + this.loggedId + ' and role = ' + this.role);
      }
      // Cargamos el perfil sobre el perfil vacio
      if (this.role === 'FAN') {
        this.printedProfile = afs.doc<Fan>('fanProfiles/' + this.loggedId);
        this.printedProfile.valueChanges().subscribe((fan) => {
          this.profile = fan;
          const ref = this.storage.ref(this.profile.imageSource);
          this.finalUrl = ref.getDownloadURL().subscribe(url => {
            this.imageURL = url;
          });
        });
      }
      if (this.role === 'MUSICIAN') {
        this.printedProfile = afs.doc<Musician>('musicianProfiles/' + this.loggedId);
        this.printedProfile.valueChanges().subscribe((musician) => {
          this.profile = musician;
          const ref = this.storage.ref(this.profile.imageSource);
          this.finalUrl = ref.getDownloadURL().subscribe(url => {
            this.imageURL = url;
          });
        });
      }
      if (this.role === 'BAND') {
        this.printedProfile = afs.doc<Band>('bandProfiles/' + this.loggedId);
        this.printedProfile.valueChanges().subscribe((band) => {
          this.profile = band;
          const ref = this.storage.ref(this.profile.imageSource);
          this.finalUrl = ref.getDownloadURL().subscribe(url => {
            this.imageURL = url;
          });
        });
      }
    });


    // Recibimos el id del url de la web o en su defecto utilizamos uno por defecto
    /* this.route.params.subscribe( params => {
        if (params.id) {
          this.loggedId = params.id;
        } else {
          // this.pathId = 'IfcscpI7GL2pFaZKEccf';
        }
      }
    );*/
  }

  ngOnInit(): void {
  }

  logOut(): void{
    // this.afAuth.authState.subscribe(() => this.router.navigate(['home']));
    this.afAuth.signOut().then(() => {
      this.loggedId = null;
      this.imageURL = 'assets/fan/avatar-man.jpg';
    });
    this.router.navigate(['home']);
  }

  goToProfile(): void {
    if (this.role === 'MUSICIAN') {
      this.router.navigate(['profile/' + this.loggedId]);
    }
    if (this.role === 'BAND') {
      this.router.navigate(['bandProfile/' + this.loggedId]);
    }
    if (this.role === 'FAN') {
      this.router.navigate(['fanProfile/' + this.loggedId]);
    }
  }
}
