import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Musician} from '../../models/musician/musician.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.view.html',
  styleUrls: ['./profile.view.sass']
})
export class ProfileView implements OnInit {
  profile: Musician;
  items: Observable<any[]>;
  printedProfile: any;
  pathId: string;

  constructor(private router: Router, private route: ActivatedRoute, firestore: AngularFirestore) {
    this.items = firestore.collection('test').valueChanges();
    this.route.params.subscribe( params => {
        if (params.id) {
          console.log(params);
          this.printedProfile = firestore.doc<Musician>('musicianProfiles/' + params.id);
          this.pathId = params.id;
          this.printedProfile.valueChanges().subscribe((musician) => {
            console.log(musician);
            this.profile = musician;
          });
        } else {
          console.log(params);
          this.printedProfile = firestore.doc<Musician>('musicianProfiles/IfcscpI7GL2pFaZKEccf');
          this.pathId = 'IfcscpI7GL2pFaZKEccf';
          this.printedProfile.valueChanges().subscribe((musician) => {
            console.log(musician);
            this.profile = musician;
          });
        }
      }
    );
    this.profile = this.printedProfile.valueChanges();
  }

  ngOnInit(): void {
  }

}
