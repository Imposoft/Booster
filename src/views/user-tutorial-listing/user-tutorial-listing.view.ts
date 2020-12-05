import { Component, OnInit } from '@angular/core';
import {Tutorial} from '../../models/tutorial/tutorial.model';
import {UserDetails} from '../../models/userDetails/user-details.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Musician} from '../../models/musician/musician.model';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-tutorial-listing',
  templateUrl: './user-tutorial-listing.view.html',
  styleUrls: ['./user-tutorial-listing.view.sass']
})
export class UserTutorialListingView implements OnInit {
  classListAux: Tutorial[];
  classList: Tutorial[] = [];

  singleClass: Tutorial;
  secondClass: Tutorial;
  tutorialOwner: UserDetails;

  printedProfileOwner: any;
  printedProfileSubscriber: any;
  classListings: any;
  private loggedId: string;

  constructor(firestore: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.loggedId = user.uid;
      }
    });
    this.printedProfileOwner = firestore.doc<Musician>('musicianProfiles/' + this.loggedId);
    this.printedProfileOwner.valueChanges().subscribe((musicianProfile) => {
      this.tutorialOwner = musicianProfile;
    });

    this.classListings = firestore.collection('tutorialPosts');
    this.classListings.valueChanges({ idField: 'id' }).subscribe((classList) => {
      this.classListAux = classList;
      /*for (let i = 0; i < this.classListAux.length; i++) {
        if (this.classListAux[i].owner === this.loggedId) {
          this.classList.push(this.classListAux[i]);
        }
      } */
      for (const item of Object.keys(this.classListAux)) {
        const tutorial = this.classListAux[item];
        console.log(tutorial);
        if (tutorial.owner === this.loggedId) {
          this.classList.push(tutorial);
        }
      }
    });
  }

  ngOnInit(): void {  }

  deleteClass(delClass: Tutorial): void {
    for (let i = 0; i < this.classList.length; i++) {
      if (this.classList[i] === delClass){
        this.classList.splice(i, 1);
      }
    }
  }
}
