import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferModificationView } from './job-offer-modification.view';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../../environments/environment';

describe('JobOfferModificationView', () => {
  let component: JobOfferModificationView;
  let fixture: ComponentFixture<JobOfferModificationView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOfferModificationView ],
      imports: [ReactiveFormsModule, AngularFirestoreModule, AngularFirestoreModule,
                RouterTestingModule],
      providers: [
        { provide: AngularFirestoreModule, useValue: AngularFirestoreModule},
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOfferModificationView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
