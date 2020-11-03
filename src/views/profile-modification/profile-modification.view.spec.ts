import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileModificationView } from './profile-modification.view';

describe('ProfileModificationView', () => {
  let component: ProfileModificationView;
  let fixture: ComponentFixture<ProfileModificationView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileModificationView ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileModificationView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
