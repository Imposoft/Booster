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

  private printedJobOffers: any;
  jobOffers: JobOffer[];
  filteredOffers: Observable<JobOffer[]>;

  constructor(pipe: DecimalPipe, private afs: AngularFirestore) {
    this.printedJobOffers =  this.afs.collection<JobOffer>('jobOfferPosts').valueChanges();

    this.filteredOffers = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );
  }

  ngOnInit(): void {
  }

  search(text: string, pipe: PipeTransform): void {
    console.log(text);
    this.printedJobOffers.subscribe(value => {
      this.jobOffers = value;
      this.jobOffers.filter(country => {
        const term = text.toLowerCase();
        return country.title.toLowerCase().includes(term);
      });
    });
  }
}


