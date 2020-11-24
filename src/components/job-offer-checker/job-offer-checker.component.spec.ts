import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferCheckerComponent } from './job-offer-checker.component';

describe('JobOfferCheckerComponent', () => {
  let component: JobOfferCheckerComponent;
  let fixture: ComponentFixture<JobOfferCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOfferCheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOfferCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
