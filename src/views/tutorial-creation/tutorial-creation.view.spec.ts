import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialCreationView } from './tutorial-creation.view';

describe('TutorialCreationView', () => {
  let component: TutorialCreationView;
  let fixture: ComponentFixture<TutorialCreationView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialCreationView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialCreationView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
