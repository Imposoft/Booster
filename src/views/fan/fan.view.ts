import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Fan} from '../../models/fan/fan.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-fan',
  templateUrl: './fan.view.html',
  styleUrls: ['./fan.view.sass']
})
export class FanView implements OnInit {
  private printedProfile: any;
  public profile: Fan;
  public pathId: string;
  private loggedId: string;

  constructor(private router: Router, private route: ActivatedRoute, firestore: AngularFirestore, public afAuth: AngularFireAuth) {
    // Perfil vacio sobre el que cargar los datos
    this.profile = {email: '', imageSource: '', location: '', name: '', password: '', phone: '', socialNetworks: []};

    // Recibimos el id del url de la web o en su defecto utilizamos uno por defecto
    this.route.params.subscribe( params => {
      if (params.id) {
        this.pathId = params.id;
      } else {
        this.pathId = 'NKUHb5YBHaCDQmSpWUFh';
      }
      // Si hemos iniciado sesion, loggedId sera nuestro id
      this.afAuth.authState.subscribe(user => {
        if (user){
          this.loggedId = user.uid;
        }
      });
      // Cargamos el perfil sobre el perfil vacio
      this.printedProfile = firestore.doc<Fan>('fanProfiles/' + this.pathId);
      this.printedProfile.valueChanges().subscribe(fan => {
        this.profile = fan;
      });
    });
  }

  ngOnInit(): void {}

  userLoggedIsProfileOwner(): boolean {
    return this.loggedId === this.pathId;
  }
}
