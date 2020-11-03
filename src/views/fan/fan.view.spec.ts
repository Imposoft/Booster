import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FanView } from './fan.view';

describe('FanView', () => {
  let component: FanView;
  let fixture: ComponentFixture<FanView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FanView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FanView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
