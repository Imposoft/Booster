import { Component, OnInit } from '@angular/core';
import {Band} from '../../models/band/band.model';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Fan} from '../../models/fan/fan.model';
import {SocialNetwork} from '../../models/profile/profile.model';

@Component({
  selector: 'app-fan',
  templateUrl: './fan.view.html',
  styleUrls: ['./fan.view.sass']
})
export class FanView implements OnInit {
  profile: Fan;
  items: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('test').valueChanges();
  }

  ngOnInit(): void {
    this.profile = {
      name: 'Manolo',
      email: 'test123@gmail.com',
      password: 'lakd65119',
      imageSource: 'assets/fan/avatar-man.jpg',
      location: 'Marbella',
      phone: '656121212',
      socialNetworks: new Map([[SocialNetwork.FACEBOOK, 'https://fb.com'],
        [SocialNetwork.TWITTER, 'https://twitter.com'],
        [SocialNetwork.INSTRAGRAM, 'https://instagram.com'],
        [SocialNetwork.REDDIT, 'https://reddit.com']]),
    };
  }
}
