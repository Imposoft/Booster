import { Component, OnInit } from '@angular/core';
import {Tutorial} from '../../models/tutorial/tutorial.model';
import {UserDetails} from '../../models/userDetails/user-details.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Band} from '../../models/band/band.model';

@Component({
  selector: 'app-tutorial-listing',
  templateUrl: './user-tutorial-listing.view.html',
  styleUrls: ['./user-tutorial-listing.view.sass']
})
export class UserTutorialListingView implements OnInit {
  classList: Tutorial[];

  singleClass: Tutorial;
  secondClass: Tutorial;
  tutorialOwner: UserDetails;

  printedProfileOwner: any;
  printedProfileSubscriber: any;
  classListings: any;

  constructor(firestore: AngularFirestore) {
    this.printedProfileOwner = firestore.doc<Band>('fanProfiles/NKUHb5YBHaCDQmSpWUFh');
    this.printedProfileOwner.valueChanges().subscribe((fanProfile) => {
      this.tutorialOwner = fanProfile;
    });

    this.classListings = firestore.collection('tutorialPosts');
    this.classListings.valueChanges({ idField: 'id' }).subscribe((classList) => {
      this.classList = classList;
    });
  }

  ngOnInit(): void {
  }

  deleteClass(delClass: Tutorial): void {
    for (let i = 0; i < this.classList.length; i++) {
      if (this.classList[i] === delClass){
        this.classList.splice(i, 1);
      }
    }
  }
}
