import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTutorialListingView } from './user-tutorial-listing.view';

describe('TutorialListingView', () => {
  let component: UserTutorialListingView;
  let fixture: ComponentFixture<UserTutorialListingView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTutorialListingView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTutorialListingView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
