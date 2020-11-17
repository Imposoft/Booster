import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferModificationView } from './job-offer-modification.view';

describe('JobOfferModificationView', () => {
  let component: JobOfferModificationView;
  let fixture: ComponentFixture<JobOfferModificationView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOfferModificationView ]
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
