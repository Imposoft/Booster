import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferView } from './job-offer.view';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {RouterTestingModule} from '@angular/router/testing';

describe('JobOfferView', () => {
  let component: JobOfferView;
  let fixture: ComponentFixture<JobOfferView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOfferView ],
      imports: [ReactiveFormsModule, AngularFirestore,
        RouterTestingModule],
      providers: [
        { provide: AngularFirestore, useValue: AngularFirestoreModule},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOfferView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
