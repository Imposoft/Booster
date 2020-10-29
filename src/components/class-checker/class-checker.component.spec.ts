import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCheckerComponent } from './class-checker.component';

describe('ClassCheckerComponent', () => {
  let component: ClassCheckerComponent;
  let fixture: ComponentFixture<ClassCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassCheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
