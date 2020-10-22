import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Fan} from '../../models/fan/fan.model';
import {SocialNetworkEnum} from '../../models/socialnetworks/socialnetworks.model';

@Component({
  selector: 'app-fan',
  templateUrl: './fan.view.html',
  styleUrls: ['./fan.view.sass']
})
export class FanView implements OnInit {
  profile: Fan;
  items: Observable<any[]>;
  fanProfiles: any;

  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('test').valueChanges();
    this.fanProfiles = firestore.collection<Fan>('fanProfiles');
  }

  ngOnInit(): void {
    this.profile = {
      name: 'Manolo',
      email: 'test123@gmail.com',
      password: 'lakd65119',
      imageSource: 'assets/fan/avatar-man.jpg',
      location: 'Marbella',
      phone: '656121212',
      socialNetworks: [{socialNetwork: SocialNetworkEnum.FACEBOOK, url: 'https://www.facebook.com/'},
        {socialNetwork: SocialNetworkEnum.TWITTER, url: 'https://www.twitter.com/'},
        {socialNetwork: SocialNetworkEnum.INSTRAGRAM, url: 'https://www.instagram.com/'},
        {socialNetwork: SocialNetworkEnum.REDDIT, url: 'https://www.reddit.com/'}],
    };
  }

  sendForm(): void {
    this.fanProfiles.add(this.profile);
  }
}
