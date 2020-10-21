import { Component, OnInit } from '@angular/core';
import {Band} from '../../models/band/band.model';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {SocialNetwork} from '../../models/profile/profile.model';

@Component({
  selector: 'app-band',
  templateUrl: './band.view.html',
  styleUrls: ['./band.view.sass']
})
export class BandView implements OnInit {

  profile: Band;
  items: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('test').valueChanges();
  }

  ngOnInit(): void {
    this.profile = {
      name: 'Rammstein',
      description: 'We are Rammstein, lol no jk',
      email: 'test@email.com',
      password: '1234512345',
      imageSource: 'assets/band/Rammstein-logo.png',
      location: 'Marbella',
      phone: '656121212',
      socialNetworks: new Map([[SocialNetwork.FACEBOOK, 'linkfacebook']]),
      genres: [undefined],
      members: [undefined],
      subscriptionPrice: 0
    };
  }
}
