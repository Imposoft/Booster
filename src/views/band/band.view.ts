import { Component, OnInit } from '@angular/core';
import {Band} from '../../models/band/band.model';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

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

  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('test').valueChanges();
    this.bandProfiles = firestore.collection<Band>('bandProfiles');
    this.printedProfile = firestore.doc<Band>('bandProfiles/CBaWe62HROxtyWDY050Y');
    this.profile = this.printedProfile.valueChanges();
  }

  ngOnInit(): void {
  }
}
