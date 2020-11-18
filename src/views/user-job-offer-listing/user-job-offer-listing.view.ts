import { Component, OnInit } from '@angular/core';
import {Tutorial} from '../../models/tutorial/tutorial.model';
import {UserDetails} from '../../models/userDetails/user-details.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Band} from '../../models/band/band.model';
import {JobOffer} from '../../models/jobOffer/job-offer.model';

@Component({
  selector: 'app-user-job-offer-listing',
  templateUrl: './user-job-offer-listing.view.html',
  styleUrls: ['./user-job-offer-listing.view.sass']
})
export class UserJobOfferListingView implements OnInit {
  jobList: JobOffer[];

  singleJob: JobOffer;
  secondJob: JobOffer;
  jobOwner: UserDetails;

  printedProfileOwner: any;
  printedProfileSubscriber: any;
  jobListings: any;

  constructor(firestore: AngularFirestore) {
    this.printedProfileOwner = firestore.doc<Band>('bandProfiles/7awf87xjSwP5TxxnigHOpnK6Nxi1');
    this.printedProfileOwner.valueChanges().subscribe((bandProfile) => {
      this.jobOwner = bandProfile;
    });

    this.jobListings = firestore.collection('jobOfferPosts');
    this.jobListings.valueChanges({ idField: 'id' }).subscribe((jobList) => {
      this.jobList = jobList;
    });
  }

  ngOnInit(): void {
  }

  deleteClass(delClass: Tutorial): void {
    for (let i = 0; i < this.jobList.length; i++) {
      if (this.jobList[i] === delClass){
        this.jobList.splice(i, 1);
      }
    }
  }
}
