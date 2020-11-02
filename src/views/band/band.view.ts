import { Component, OnInit } from '@angular/core';
import {Band} from '../../models/band/band.model';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute, Router} from '@angular/router';
import {UserDetails} from '../../models/userDetails/user-details.model';
import {Musician} from '../../models/musician/musician.model';

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

  members: Musician[];

  constructor(private router: Router, private route: ActivatedRoute, firestore: AngularFirestore) {
    this.route.params.subscribe( params => {
        if (params.id) {
          console.log(params);
          this.printedProfile = firestore.doc<Band>('bandProfiles/' + params.id);
          this.pathId = params.id;
          this.printedProfile.valueChanges().subscribe((tutorial) => {
            console.log(tutorial);
            this.profile = tutorial;
          });
        } else {
          console.log(params);
          this.printedProfile = firestore.doc<Band>('bandProfiles/CBaWe62HROxtyWDY050Y');
          this.pathId = 'CBaWe62HROxtyWDY050Y';
          this.printedProfile.valueChanges().subscribe(tutorial => {
            this.profile = tutorial;
          });
        }
      }
    );
  }

  ngOnInit(): void {
  }
}
