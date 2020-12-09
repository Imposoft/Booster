import {Component, OnInit, PipeTransform} from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {JobOffer} from '../../models/jobOffer/job-offer.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Fan} from '../../models/fan/fan.model';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.sass'],
  providers: [DecimalPipe]
})

export class SearchFilterComponent implements OnInit {
  filter = new FormControl('');

  model = 1;

  jobOffers: Observable<JobOffer[]>;

  constructor(pipe: DecimalPipe, private afs: AngularFirestore) {
    this.jobOffers = this.afs.collection<JobOffer>('jobOfferPosts').valueChanges({idField: 'id'});

    this.filter.valueChanges.subscribe( text =>
      this.jobOffers = this.afs.collection<JobOffer>('jobOfferPosts', ref => ref.orderBy('title').startAt(text).endAt(text + '\uf8ff')).valueChanges({idField: 'id'})
    );
  }

  ngOnInit(): void {
  }

}
