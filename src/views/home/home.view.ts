import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Musician} from '../../models/musician/musician.model';
import {map} from 'rxjs/operators';
import {Profile} from '../../models/profile/profile.model';
import {Tutorial} from '../../models/tutorial/tutorial.model';
import {JobOffer} from '../../models/jobOffer/job-offer.model';


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
  private perfiles: AngularFirestoreCollection<Musician>;
  private clases: AngularFirestoreCollection<Tutorial>;
  private ofertas: AngularFirestoreCollection<JobOffer>;
  private usersProfile: Profile[];
  private clase: Tutorial[];
  private oferta: JobOffer[];
  DropdownVar: number;
  show1 = true;
  show2 = false;
  show3 = false;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.usersProfile = [];
    this.clase = [];
    this.oferta = [];

    this.perfiles = this.firestore.collection<Musician>('musicianProfiles/', ref => ref.limitToLast(10).orderBy('name'));
    this.perfiles.snapshotChanges().subscribe(actions => {
      return actions.map(a => {
        console.log(a.payload.doc.id);
        const val = a.payload.doc.data();
        val.id = a.payload.doc.id;
        this.usersProfile.push(val);
      });
    });
    this.clases = this.firestore.collection<Tutorial>('tutorialPosts/', ref => ref.limitToLast(10).orderBy('title'));
    this.clases.snapshotChanges().subscribe(actions => {
      return actions.map(a => {
        const val1 = a.payload.doc.data();
        this.clase.push(val1);
      });
    });
    this.ofertas = this.firestore.collection<JobOffer>('jobOfferPosts/', ref => ref.limitToLast(10).orderBy('title'));
    this.ofertas.snapshotChanges().subscribe(actions => {
      return actions.map(a => {
        const val2 = a.payload.doc.data();
        this.oferta.push(val2);
      });
    });
    this.DropdownVar = 0;
  }

  showFunction(num: any): void {
    if (num === 1) {
      this.show1 = true;
      this.show2 = false;
      this.show3 = false;
    } else if (num === 2) {
      this.show1 = false;
      this.show2 = true;
      this.show3 = false;
    } else {
      this.show1 = false;
      this.show2 = false;
      this.show3 = true;
    }
  }

}
