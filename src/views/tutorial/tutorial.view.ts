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

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.view.html',
  styleUrls: ['./tutorial.view.sass']
})
export class TutorialView implements OnInit {
  tutorialPost: Tutorial;
  tutorialOwner: UserDetails;

  printedProfile: any;
  profile: Fan;
  items: Observable<any[]>;
  fanProfiles: any;

  constructor(private afs: AngularFirestore) {
    /*this.tutorialPosts = afs.collection<Tutorial>('tutorialPosts');
    this.items = afs.collection('test').valueChanges();
    this.fanProfiles = afs.collection<Fan>('fanProfiles');
    this.printedProfile = afs.doc<Fan>('fanProfiles/NKUHb5YBHaCDQmSpWUFh');
    this.profile = this.printedProfile.valueChanges();*/
  }

  ngOnInit(): void {
    this.tutorialOwner = {
      contact: '1231231312',
      id: 'asdadsada',
      imageurl: 'assets/fan/avatar-man.jpg',
      name: 'Pepe'
    };

    this.tutorialPost = {
      body: 'Cuerpo del tutorial',
      description: 'Descripcion de la clase particular',
      exclusive: false,
      imgUrl: 'assets/class/guitarclass.jpg',
      price: 25,
      promoted: false,
      title: 'Clases de piano',
      userWaitList: [],
      owner: this.tutorialOwner
    };
  }
}
