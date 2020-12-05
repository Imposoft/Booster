import { Component, OnInit } from '@angular/core';
import {Tutorial} from '../../models/tutorial/tutorial.model';
import {UserDetails} from '../../models/userDetails/user-details.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Band} from '../../models/band/band.model';
import {JobOffer} from '../../models/jobOffer/job-offer.model';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-user-job-offer-listing',
  templateUrl: './user-job-offer-listing.view.html',
  styleUrls: ['./user-job-offer-listing.view.sass']
})
export class UserJobOfferListingView implements OnInit {
  jobListAux: JobOffer[];
  jobList: JobOffer[] = [];

  singleJob: JobOffer;
  secondJob: JobOffer;
  jobOwner: UserDetails;

  printedProfileOwner: any;
  printedProfileSubscriber: any;
  jobListings: any;
  private loggedId: string;

  constructor(firestore: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.loggedId = user.uid;
      }
    });
    this.printedProfileOwner = firestore.doc<Band>('bandProfiles/' + this.loggedId);
    this.printedProfileOwner.valueChanges().subscribe((bandProfile) => {
      this.jobOwner = bandProfile;
    });

    this.jobListings = firestore.collection('jobOfferPosts');
    this.jobListings.valueChanges({ idField: 'id' }).subscribe((jobList) => {
      this.jobListAux = jobList;
      for (const item of Object.keys(this.jobListAux)) {
        const jobOffer = this.jobListAux[item];
        console.log(jobOffer);
        if (jobOffer.owner === this.loggedId) {
          this.jobList.push(jobOffer);
        }
      }
    });
  }

  ngOnInit(): void {
  }

  deleteClass(delJobOffer: JobOffer): void {
    for (let i = 0; i < this.jobList.length; i++) {
      if (this.jobList[i] === delJobOffer){
        this.jobList.splice(i, 1);
      }
    }
  }
}
