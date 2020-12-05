import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CalendarEvent, CalendarMonthViewDay, CalendarView, CalendarWeekViewBeforeRenderEvent} from 'angular-calendar';
import {WeekViewHourColumn} from 'calendar-utils';
import {Fan} from '../../models/fan/fan.model';
import {Musician} from '../../models/musician/musician.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
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
export class CalendarComponent implements OnInit {
  @Input() ownerId: string;

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();

  selectedMonthViewDay: CalendarMonthViewDay;

  selectedDayViewDate: Date;

  hourColumns: WeekViewHourColumn[];

  events: CalendarEvent[] = [];

  musicianProfile: Musician;

  selectedDays: any = [];
  public printedProfile: any;

  refresh: Subject<any> = new Subject();

  constructor(public firestore: AngularFirestore) {
    this.musicianProfile = {description: '', email: '', genres: [], imageSource: '', instruments: [], jobOffers: [],
      location: '', name: '', password: '', phone: '', reservations: [], socialNetworks: [], subscriptionPrice: 0, tutorials: []
    };
    this.printedProfile = this.firestore.doc<Musician>('musicianProfiles/' + this.ownerId);
    this.printedProfile.valueChanges().subscribe((musician) => {
      this.musicianProfile = musician;
      console.log(musician.reservations);
      this.selectedDays = this.musicianProfile.reservations;
    });
  }

  ngOnInit(): void {
  }

  dayClicked(day: CalendarMonthViewDay): void {
    this.selectedMonthViewDay = day;
    const selectedDateTime = this.selectedMonthViewDay.date.getTime();
    const dateIndex = this.selectedDays.findIndex(
      (selectedDay) => selectedDay.date.getTime() === selectedDateTime
    );
    if (dateIndex > -1) {
      console.log(day);
      delete this.selectedMonthViewDay.cssClass;
      this.selectedDays.splice(dateIndex, 1);
    } else {
      console.log(day);
      this.selectedDays.push(this.selectedMonthViewDay);
      day.cssClass = 'cal-day-selected';
      this.selectedMonthViewDay = day;
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      if (
        this.selectedDays.some(
          (selectedDay) => selectedDay.date.getTime() === day.date.getTime()
        )
      ) {
        day.cssClass = 'cal-day-selected';
      }
    });
  }

  hourSegmentClicked(date: Date): void {
    this.selectedDayViewDate = date;
    this.addSelectedDayViewClass();
  }

  beforeWeekOrDayViewRender(event: CalendarWeekViewBeforeRenderEvent): void {
    this.hourColumns = event.hourColumns;
    this.addSelectedDayViewClass();
  }

  private addSelectedDayViewClass(): void {
    this.hourColumns.forEach((column) => {
      column.hours.forEach((hourSegment) => {
        hourSegment.segments.forEach((segment) => {
          delete segment.cssClass;
          if (
            this.selectedDayViewDate &&
            segment.date.getTime() === this.selectedDayViewDate.getTime()
          ) {
            segment.cssClass = 'cal-day-selected';
          }
        });
      });
    });
  }

  updateDay(day): void {
    this.selectedMonthViewDay = day;
    console.log(this.selectedMonthViewDay);
    const selectedDateTime = this.selectedMonthViewDay.date.getTime();
    const dateIndex = this.selectedDays.findIndex(
      (selectedDay) => selectedDay.date.getTime() === selectedDateTime
    );
    if (dateIndex > -1) {
      console.log(day + 'here');
      delete this.selectedMonthViewDay.cssClass;
      this.selectedDays.splice(dateIndex, 1);
    } else {
      console.log(day + 'there');
      this.selectedDays.push(this.selectedMonthViewDay);
      day.cssClass = 'cal-day-selected';
      this.selectedMonthViewDay = day;
    }
  }

  subirSeleccion(): void {
    this.printedProfile = this.firestore.doc<Musician>('musicianProfiles/' + this.ownerId);
    this.printedProfile.valueChanges().subscribe((musician) => {
      this.musicianProfile = musician;
      this.musicianProfile.reservations = this.selectedDays;
    });
    this.printedProfile.update(this.musicianProfile);
    console.log(this.selectedDays.valueOf());
  }

  mostrarSeleccion(): void {
    this.printedProfile = this.firestore.doc('musicianProfiles/' + this.ownerId);
    this.printedProfile.valueChanges().subscribe((musician) => {
      console.log(musician.reservations);
      this.musicianProfile = musician;
      console.log(musician.reservations);
      musician.reservations.forEach(element => {
        console.log(element.date.toDate());
        element.date = element.date.toDate();
        element.cssClass = 'cal-day-selected';
        this.updateDay(element);
        this.refresh.next();
      });
    });
  }
}
