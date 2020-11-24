import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferView } from './job-offer.view';

describe('JobOfferView', () => {
  let component: JobOfferView;
  let fixture: ComponentFixture<JobOfferView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOfferView ]
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
