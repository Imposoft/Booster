import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Fan} from '../../models/fan/fan.model';
import {SocialNetworkEnum} from '../../models/socialnetworks/socialnetworks.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Band} from '../../models/band/band.model';

@Component({
  selector: 'app-fan',
  templateUrl: './fan.view.html',
  styleUrls: ['./fan.view.sass']
})
export class FanView implements OnInit {
  printedProfile: any;
  profile: Fan;
  items: Observable<any[]>;
  fanProfiles: any;
  pathId: string;

  constructor(private router: Router, private route: ActivatedRoute, firestore: AngularFirestore) {
    this.route.params.subscribe( params => {
        if (params.id) {
          console.log(params);
          this.printedProfile = firestore.doc<Fan>('fanProfiles/' + params.id);
          this.pathId = params.id;
        } else {
          console.log(params);
          this.printedProfile = firestore.doc<Fan>('fanProfiles/NKUHb5YBHaCDQmSpWUFh');
          this.pathId = 'NKUHb5YBHaCDQmSpWUFh';
        }
      }
    );
    this.profile = this.printedProfile.valueChanges();
  }

  ngOnInit(): void {
    /*this.profile2 = {
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
    };*/
  }

  sendForm(): void {
    this.fanProfiles.add(this.profile);
  }
}
