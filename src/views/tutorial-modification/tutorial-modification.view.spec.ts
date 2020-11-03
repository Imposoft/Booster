import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialModificationView } from './tutorial-modification.view';

describe('TutorialModificationView', () => {
  let component: TutorialModificationView;
  let fixture: ComponentFixture<TutorialModificationView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialModificationView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialModificationView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
