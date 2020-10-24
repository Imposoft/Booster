import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FanModificationView } from './fan-modification.view';

describe('FanModificationView', () => {
  let component: FanModificationView;
  let fixture: ComponentFixture<FanModificationView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FanModificationView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FanModificationView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
