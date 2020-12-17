import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Musician} from '../../models/musician/musician.model';
import {map} from 'rxjs/operators';
import {Profile} from '../../models/profile/profile.model';
import {Tutorial} from '../../models/tutorial/tutorial.model';
import {JobOffer} from '../../models/jobOffer/job-offer.model';
import {Band} from '../../models/band/band.model';
import {Fan} from '../../models/fan/fan.model';
import {AngularFireStorage} from '@angular/fire/storage';


@Component({
  selector: 'app-home',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.sass'],
  styles: [
    `
      .cal-day-selected,
      .cal-day-selected:hover {
        background-color: firebrick !important;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class HomeView implements OnInit {
  private musicians: AngularFirestoreCollection<Musician>;
  private bands: AngularFirestoreCollection<Band>;
  private fans: AngularFirestoreCollection<Fan>;
  private clases: AngularFirestoreCollection<Tutorial>;
  private ofertas: AngularFirestoreCollection<JobOffer>;
  private musicianProfiles: Profile[];
  private bandProfiles: Profile[];
  private fanProfiles: Profile[];
  private clase: Tutorial[];
  private oferta: JobOffer[];
  DropdownVar: number;
  constructor(private firestore: AngularFirestore, public storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.musicianProfiles = [];
    this.bandProfiles = [];
    this.fanProfiles = [];
    this.clase = [];
    this.oferta = [];

    this.musicians = this.firestore.collection<Musician>('musicianProfiles/', ref => ref.limitToLast(5).orderBy('name'));
    this.musicians.snapshotChanges().subscribe(actions => {
      return actions.map(a => {
        const val = a.payload.doc.data();
        val.id = a.payload.doc.id;
        this.musicianProfiles.push(val);
        this.musicianProfiles.forEach((profile, index) => {
          const ref = this.storage.ref(profile.imageSource);
          ref.getDownloadURL().subscribe(url =>
            this.musicianProfiles[index].imageSource = url
          );
        });
      });
    });
    this.bands = this.firestore.collection<Band>('bandProfiles/', ref => ref.limitToLast(5).orderBy('name'));
    this.bands.snapshotChanges().subscribe(actions => {
      return actions.map(a => {
        const val = a.payload.doc.data();
        val.id = a.payload.doc.id;
        this.bandProfiles.push(val);
        this.bandProfiles.forEach((profile, index) => {
          const ref = this.storage.ref(profile.imageSource);
          ref.getDownloadURL().subscribe(url =>
            this.bandProfiles[index].imageSource = url
          );
        });
      });
    });
    this.fans = this.firestore.collection<Fan>('fanProfiles/', ref => ref.limitToLast(5).orderBy('name'));
    this.fans.snapshotChanges().subscribe(actions => {
      return actions.map(a => {
        const val = a.payload.doc.data();
        val.id = a.payload.doc.id;
        this.fanProfiles.push(val);
        this.fanProfiles.forEach((profile, index) => {
          const ref = this.storage.ref(profile.imageSource);
          ref.getDownloadURL().subscribe(url =>
            this.fanProfiles[index].imageSource = url
          );
        });
      });
    });
    this.clases = this.firestore.collection<Tutorial>('tutorialPosts/', ref => ref.limitToLast(5).orderBy('title'));
    this.clases.snapshotChanges().subscribe(actions => {
      return actions.map(a => {
        const val1 = a.payload.doc.data();
        val1.id = a.payload.doc.id;
        this.clase.push(val1);
      });
    });
    this.ofertas = this.firestore.collection<JobOffer>('jobOfferPosts/', ref => ref.limitToLast(5).orderBy('title'));
    this.ofertas.snapshotChanges().subscribe(actions => {
      return actions.map(a => {
        const val2 = a.payload.doc.data();
        val2.id = a.payload.doc.id;
        this.oferta.push(val2);
      });
    });
    this.DropdownVar = 0;
  }
}
