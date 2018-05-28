import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchLectureComponent } from './watch-lecture.component';

describe('WatchLectureComponent', () => {
  let component: WatchLectureComponent;
  let fixture: ComponentFixture<WatchLectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchLectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
