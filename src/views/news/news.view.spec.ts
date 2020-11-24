import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsView } from './news.view';

describe('NewsView', () => {
  let component: NewsView;
  let fixture: ComponentFixture<NewsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
