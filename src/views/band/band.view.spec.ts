import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandView } from './band.view';

describe('BandView', () => {
  let component: BandView;
  let fixture: ComponentFixture<BandView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
