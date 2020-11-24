import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadUrlComponent } from './download-url.component';

describe('DownloadUrlComponent', () => {
  let component: DownloadUrlComponent;
  let fixture: ComponentFixture<DownloadUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
