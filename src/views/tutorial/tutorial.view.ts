import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profile, SocialNetwork} from '../../models/profile/profile.model';
import {debounceTime} from 'rxjs/operators';
import {Tutorial} from '../../models/tutorial/tutorial.model';
import {UserDetails} from '../../models/userDetails/user-details.model';
import {Band} from '../../models/band/band.model';
import {SocialNetworkEnum} from '../../models/socialnetworks/socialnetworks.model';
import {Fan} from '../../models/fan/fan.model';
import {Musician} from '../../models/musician/musician.model';
import {Routes} from '@angular/router';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.view.html',
  styleUrls: ['./tutorial.view.sass']
})
export class TutorialView implements OnInit {
  tutorialPost: Tutorial;
  tutorialOwner: UserDetails;
  fanDetails: UserDetails;

  printedProfile: any;
  profile: Fan;
  items: Observable<any[]>;
  fanProfiles: any;

  ButtonVisible = true;

  private _success = new Subject<string>();
  successMessage = '';

  constructor(private afs: AngularFirestore) {
    // this.tutorialPost = afs.collection<Tutorial>('tutorialPosts/VAsSNdEArx0nRtgexSMk');
    this.printedProfile = afs.doc<Fan>('fanProfiles/NKUHb5YBHaCDQmSpWUFh');
    this.profile = this.printedProfile.valueChanges();
  }

  ngOnInit(): void {
    this.tutorialOwner = {
      contact: '1231231312',
      id: 'FVgBtsJlkRl0qZU4VaiW',
      imageurl: 'https://image.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14044.jpg',
      name: 'Pepe'
    };

    this.fanDetails = {
      id: '50',
      imageurl: this.profile.imageSource,
      name: this.profile.name,
      contact: this.profile.phone
    };

    this.tutorialPost = {
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pretium est ornare tellus molestie, eget egestas ligula faucibus. Morbi ipsum arcu, aliquet tincidunt lacus vel, consequat venenatis urna. Proin nec eleifend justo, a pretium mauris. In auctor ex vitae dictum pulvinar. Maecenas commodo elit eu consectetur rutrum. Phasellus nec nulla eleifend, hendrerit eros pulvinar, varius nibh. Pellentesque eu justo in erat posuere finibus nec nec odio. Sed iaculis rhoncus odio, porta dictum augue posuere quis. Nulla nec varius lectus, nec rhoncus nisl. Donec vel venenatis lorem. Integer elit ante, vulputate sed efficitur nec, facilisis ac purus. Donec in felis massa. Proin a nisl vel ligula finibus pulvinar nec quis nulla. Sed non convallis metus. Phasellus venenatis tristique mauris, non convallis tellus posuere ut.\n' +
        '\n' +
        'Nunc ut hendrerit ante, sed varius lectus. Quisque ornare id augue eu congue. Morbi ex nulla, molestie id sapien convallis, porta lobortis ipsum. Suspendisse commodo augue eget tortor auctor, sit amet aliquam ipsum malesuada. Pellentesque convallis tellus condimentum turpis scelerisque ultrices. Maecenas vitae ultricies orci. Donec placerat nisi purus, vitae vehicula ipsum facilisis sed. Nullam quis libero sed quam pellentesque elementum. In ornare erat sed felis placerat semper. Nam ac nulla nisl.',
      exclusive: false,
      imgUrl: 'assets/class/guitarclass.jpg',
      price: 25,
      promoted: false,
      title: 'Clases de piano',
      userWaitList: [{id: '20', imageurl: 'assets/fan/avatar-man.jpg', name: 'Pedro', contact: '611222333'},
        {id: '30', imageurl: 'assets/fan/avatar-man.jpg', name: 'Juan', contact: '611222334'},
        {id: '40', imageurl: 'assets/fan/avatar-man.jpg', name: 'Patricio', contact: '611222336'}],
      owner: this.tutorialOwner
    };

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(2500)
    ).subscribe(() => this.successMessage = '');
  }

  applyForTutorial(): void{
    this.tutorialPost.userWaitList.push(this.fanDetails);
    // this.tutorialPost = {
    //  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pretium est ornare tellus molestie, eget egestas ligula faucibus. Morbi ipsum arcu, aliquet tincidunt lacus vel, consequat venenatis urna. Proin nec eleifend justo, a pretium mauris. In auctor ex vitae dictum pulvinar. Maecenas commodo elit eu consectetur rutrum. Phasellus nec nulla eleifend, hendrerit eros pulvinar, varius nibh. Pellentesque eu justo in erat posuere finibus nec nec odio. Sed iaculis rhoncus odio, porta dictum augue posuere quis. Nulla nec varius lectus, nec rhoncus nisl. Donec vel venenatis lorem. Integer elit ante, vulputate sed efficitur nec, facilisis ac purus. Donec in felis massa. Proin a nisl vel ligula finibus pulvinar nec quis nulla. Sed non convallis metus. Phasellus venenatis tristique mauris, non convallis tellus posuere ut.\n' +
    // '\n' +
    // 'Nunc ut hendrerit ante, sed varius lectus. Quisque ornare id augue eu congue. Morbi ex nulla, molestie id sapien convallis, porta lobortis ipsum. Suspendisse commodo augue eget tortor auctor, sit amet aliquam ipsum malesuada. Pellentesque convallis tellus condimentum turpis scelerisque ultrices. Maecenas vitae ultricies orci. Donec placerat nisi purus, vitae vehicula ipsum facilisis sed. Nullam quis libero sed quam pellentesque elementum. In ornare erat sed felis placerat semper. Nam ac nulla nisl.',
    /*  exclusive: false,
      imgUrl: 'assets/class/guitarclass.jpg',
      price: 25,
      promoted: false,
      title: 'Clases de piano',
      userWaitList: [{id: '20', imageurl: 'assets/fan/avatar-man.jpg', name: 'Pedro', contact: '611222333'},
      {id: '30', imageurl: 'assets/fan/avatar-man.jpg', name: 'Juan', contact: '611222334'},
      {id: '40', imageurl: 'assets/fan/avatar-man.jpg', name: 'Patricio', contact: '611222336'},
      this.fanDetails],
      owner: this.tutorialOwner
    };*/
    this._success.next('Reserva solicitada con exito! ');
    // this.ButtonVisible = false;
  }
}
