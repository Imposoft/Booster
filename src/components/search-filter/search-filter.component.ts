import {Component, OnInit, PipeTransform, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {map, startWith, filter} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {JobOffer} from '../../models/jobOffer/job-offer.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Fan} from '../../models/fan/fan.model';
import {Musician} from '../../models/musician/musician.model';
import {Band} from '../../models/band/band.model';
import {Tutorial} from '../../models/tutorial/tutorial.model';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.sass']
})

export class SearchFilterComponent implements OnInit {
  filter = new FormControl('');

  model = 1;

  jobOffers: Observable<JobOffer[]>;
  musicians: Observable<Musician[]>;
  bands: Observable<Band[]>;
  fans: Observable<Fan[]>;
  tutorialList: Observable<Tutorial[]>;

  realJobOffers: JobOffer[];
  realMusicians: Musician[];
  realBands: Band[];
  realFans: Fan[];
  realTutorials: Tutorial[];

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

    this.musicians = this.afs.collection<Musician>('musicianProfiles').valueChanges({idField: 'id'});
    this.musicians.subscribe(value => this.realMusicians = value);

    this.filter.valueChanges.subscribe( text => {
        this.musicians.pipe(
          map(users => users.filter(user => user.name.toLowerCase().includes(text.toLowerCase())))
        ).subscribe(value => this.realMusicians = [...value]);
      }
    );

    this.bands = this.afs.collection<Band>('bandProfiles').valueChanges({idField: 'id'});
    this.bands.subscribe(value => this.realBands = value);

    this.filter.valueChanges.subscribe( text => {
        this.bands.pipe(
          map(users => users.filter(user => user.name.toLowerCase().includes(text.toLowerCase())))
        ).subscribe(value => this.realBands = [...value]);
      }
    );

    this.fans = this.afs.collection<Fan>('fanProfiles').valueChanges({idField: 'id'});
    this.fans.subscribe(value => this.realFans = value);

    this.filter.valueChanges.subscribe( text => {
        this.fans.pipe(
          map(users => users.filter(user => user.name.toLowerCase().includes(text.toLowerCase())))
        ).subscribe(value => this.realFans = [...value]);
      }
    );
    this.tutorialList = this.afs.collection<Tutorial>('tutorialPosts').valueChanges({idField: 'id'});
    this.tutorialList.subscribe(value => this.realTutorials = value);

    this.filter.valueChanges.subscribe( text => {
        this.tutorialList.pipe(
          map(jobOffers => jobOffers.filter(jobOffer => jobOffer.title.toLowerCase().includes(text.toLowerCase())))
        ).subscribe(value => this.realTutorials = [...value]);
      }
    );

  }

  ngOnInit(): void {
  }

}
