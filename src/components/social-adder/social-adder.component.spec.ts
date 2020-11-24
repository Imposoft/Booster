import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAdderComponent } from './social-adder.component';

describe('SocialAdderComponent', () => {
  let component: SocialAdderComponent;
  let fixture: ComponentFixture<SocialAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialAdderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
