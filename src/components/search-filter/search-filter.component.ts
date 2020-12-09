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
  countries$: Observable<Country[]>;
  filter = new FormControl('');

  model = 1;

  private printedJobOffers: any;
  jobOffers: Observable<JobOffer[]>;

  constructor(pipe: DecimalPipe, private afs: AngularFirestore) {
    this.printedJobOffers =  this.afs.collection<JobOffer>('jobOfferPosts').valueChanges();

    this.jobOffers = this.afs.collection<JobOffer>('jobOfferPosts').valueChanges();

    this.filter.valueChanges.subscribe( text =>
      this.jobOffers = this.afs.collection<JobOffer>('jobOfferPosts', ref => ref.orderBy('title').startAt(text).endAt(text + "\uf8ff")).valueChanges()
    );
  }

  ngOnInit(): void {
  }

}

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];

function search(text: string, pipe: PipeTransform): Country[] {
  return COUNTRIES.filter(country => {
    const term = text.toLowerCase();
    return country.name.toLowerCase().includes(term)
      || pipe.transform(country.area).includes(term)
      || pipe.transform(country.population).includes(term);
  });
}
