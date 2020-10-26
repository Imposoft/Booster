import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialView } from './tutorial.view';

describe('TutorialView', () => {
  let component: TutorialView;
  let fixture: ComponentFixture<TutorialView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
