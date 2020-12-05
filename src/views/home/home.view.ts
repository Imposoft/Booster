import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { CalendarMonthViewDay, CalendarView } from 'angular-calendar';
import { CalendarEvent, CalendarWeekViewBeforeRenderEvent } from 'angular-calendar';
import { WeekViewHour, WeekViewHourColumn } from 'calendar-utils';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Musician} from '../../models/musician/musician.model';
import {map} from 'rxjs/operators';


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
  private musico: any;
  private size: any;
  private perfil: any;


  constructor(private firestore: AngularFirestore) {
    this.perfiles = firestore.collection<Musician>('musicianProfiles/', ref => ref.limitToLast(5).orderBy('name'));
    this.perfiles = firestore.collection<Musician>('musicianProfiles/');
    this.perfil = this.perfiles.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Musician;
          const id = a.payload.doc.id;
          console.log(id);
          // return { id, ...data };
        });
      })
    );
    this.musico = this.perfiles.snapshotChanges().subscribe(actions => {
      return actions.map(a => {
        const val = a.payload.doc.data();
        // console.log(val.name);
      });
    });
  }

  ngOnInit(): void {
  }

}
