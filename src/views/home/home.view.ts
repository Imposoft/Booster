import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Musician} from '../../models/musician/musician.model';
import {map} from 'rxjs/operators';
import {Profile} from '../../models/profile/profile.model';


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
  private usersProfile: Profile[];
  private usersAux: Profile[];
  DropdownVar: number;
  show: boolean;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.usersProfile = [];
    this.usersAux = [];
    this.perfiles = this.firestore.collection<Musician>('musicianProfiles/', ref => ref.limitToLast(10).orderBy('name'));
    this.perfiles.snapshotChanges().subscribe(actions => {
      return actions.map(a => {
        const val = a.payload.doc.data();
        this.usersProfile.push(val);
      });
    });
    console.log('Entra');
    this.usersProfile = this.mezclar(this.usersProfile);
    console.log('Hace');
  }

  private mezclar(array: Profile[]): Profile[] {
    console.log(array.length);
    let currentIndex: any = array.length;
    let temporaryValue: any;
    let randomIndex: any;
    console.log(currentIndex);
    while (0 !== currentIndex) {
      console.log('Jelou');
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
      console.log(randomIndex);
    }
    return array;
  }

}
