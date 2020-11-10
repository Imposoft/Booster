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

  profile: Band;
  items: Observable<any[]>;
  bandProfiles;
  printedProfile: any;
  pathId: string;
  loggedId: string;

  members: Musician[];

  constructor(private router: Router, private route: ActivatedRoute, firestore: AngularFirestore, public afAuth: AngularFireAuth) {
    this.route.params.subscribe( params => {
        if (params.id) {
          console.log(params);
          this.printedProfile = firestore.doc<Band>('bandProfiles/' + params.id);
          this.pathId = params.id;
          this.printedProfile.valueChanges().subscribe((band) => {
            console.log(band);
            this.profile = band;
          });
        } else {
          console.log(params);
          this.printedProfile = firestore.doc<Band>('bandProfiles/n6ZhZ1TJI7iayJS4GQrc');
          this.pathId = 'n6ZhZ1TJI7iayJS4GQrc';
          this.printedProfile.valueChanges().subscribe(band => {
            this.profile = band;
          });
        }
      }
    );
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.loggedId = user.uid;
      }
      else{

      }
    });
  }

  ngOnInit(): void {
  }
}
