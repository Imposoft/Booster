import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialListingView } from './tutorial-listing.view';

describe('TutorialListingView', () => {
  let component: TutorialListingView;
  let fixture: ComponentFixture<TutorialListingView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialListingView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialListingView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
