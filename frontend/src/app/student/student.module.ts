import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentComponent} from './student.component';
import {RouterModule} from "@angular/router";
import {YoutubePlayerModule} from "ngx-youtube-player";
import {HeaderComponent} from './header/header.component';
import {StudentProfileComponent} from './student-profile/student-profile.component';
import {WatchLectureComponent} from './watch-lecture/watch-lecture.component';
import {CourseListComponent} from './course-list/course-list.component';
import { LectureListComponent } from './lecture-list/lecture-list.component';
import { ClassListComponent } from './class-list/class-list.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';

const studentRoute = [
  {
    path: 'student', component: StudentComponent,
    children: [
      {
        path: '', component: ClassListComponent
      },
      {
        path: 'profile', component: StudentProfileComponent
      },
      {
        path: 'classes', component: ClassListComponent
      },

      {
        path: 'courses', component: CourseListComponent
      },
      {
        path: 'lectures', component: LectureListComponent,
      },
      {
        path: 'lectures:id', component: WatchLectureComponent,
      },
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(studentRoute),
    YoutubePlayerModule
  ],
  declarations: [
    StudentComponent,
    HeaderComponent,
    StudentProfileComponent,
    WatchLectureComponent,
    CourseListComponent,
    LectureListComponent,
    ClassListComponent,
    ClassDetailComponent
  ]
})
export class StudentModule {
}
