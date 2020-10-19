import {Component, OnInit} from '@angular/core';
import {Profile, Roles} from '../../models/profile/profile.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.view.html',
  styleUrls: ['./profile.view.sass']
})
export class ProfileView implements OnInit {
  exampleProfile: Profile;
  items: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('test').valueChanges();
  }

  ngOnInit(): void {
    this.exampleProfile = {
      name: 'Pepe',
      email: 'test@email.com',
      password: '1234512345',
      imageSource: 'assets/profile/img_avatar.png',
      location: 'Marbella',
      role: Roles.musician,
      description: 'TestDescription',
    };
  }

}
