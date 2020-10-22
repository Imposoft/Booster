import { Component, OnInit } from '@angular/core';
import {Band} from '../../models/band/band.model';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {SocialNetwork} from '../../models/profile/profile.model';
import {SocialNetworkEnum} from '../../models/socialnetworks/socialnetworks.model';

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
      socialNetworks: [{socialNetwork: SocialNetworkEnum.FACEBOOK, url: 'https://www.facebook.com/'},
        {socialNetwork: SocialNetworkEnum.TWITTER, url: 'https://www.twitter.com/'},
        {socialNetwork: SocialNetworkEnum.INSTRAGRAM, url: 'https://www.instagram.com/'},
        {socialNetwork: SocialNetworkEnum.REDDIT, url: 'https://www.reddit.com/'}],
      genres: [{name: 'Heavy'},{name: 'Pop'}    ],
      members: [undefined],
      subscriptionPrice: 0
    };
  }
}
