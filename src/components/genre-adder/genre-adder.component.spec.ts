import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreAdderComponent } from './genre-adder.component';

describe('GenreAdderComponent', () => {
  let component: GenreAdderComponent;
  let fixture: ComponentFixture<GenreAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreAdderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
