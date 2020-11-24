import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserJobOfferListingView } from './user-job-offer-listing.view';

describe('UserJobOfferListingView', () => {
  let component: UserJobOfferListingView;
  let fixture: ComponentFixture<UserJobOfferListingView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserJobOfferListingView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserJobOfferListingView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
