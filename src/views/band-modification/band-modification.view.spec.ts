import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandModificationView } from './band-modification.view';

describe('BandModificationView', () => {
  let component: BandModificationView;
  let fixture: ComponentFixture<BandModificationView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandModificationView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandModificationView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
