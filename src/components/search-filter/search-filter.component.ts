import {Component, OnInit, PipeTransform, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {map, startWith, filter} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {JobOffer} from '../../models/jobOffer/job-offer.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Fan} from '../../models/fan/fan.model';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.sass']
})

export class SearchFilterComponent implements OnInit {
  filter = new FormControl('');

  model = 1;

  jobOffers: Observable<JobOffer[]>;

  realJobOffers: JobOffer[];

  public trackItem(index: number, item: JobOffer): string {
    return item.id;
  }


  constructor(private afs: AngularFirestore) {
    this.jobOffers = this.afs.collection<JobOffer>('jobOfferPosts').valueChanges({idField: 'id'});
    this.jobOffers.subscribe(value => this.realJobOffers = value);

    this.filter.valueChanges.subscribe( text => {
      this.jobOffers.pipe(
        map(jobOffers => jobOffers.filter(jobOffer => jobOffer.title.toLowerCase().includes(text.toLowerCase())))
      ).subscribe(value => this.realJobOffers = [...value]);
    }
    );
  }

  ngOnInit(): void {
  }

}
