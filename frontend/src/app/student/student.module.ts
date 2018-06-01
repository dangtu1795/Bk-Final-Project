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
import {ShareModule} from "../share-components/share.module";
import {FormsModule} from "@angular/forms";
import {MyDatePickerModule} from "../share-components/my-date-picker/my-date-picker.module";

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
        path: 'class/:id', component: ClassDetailComponent
      },
      {
        path: 'courses', component: CourseListComponent
      },
      {
        path: 'lectures', component: LectureListComponent,
      },
      {
        path: 'lecture/:id', component: WatchLectureComponent,
      },
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(studentRoute),
    YoutubePlayerModule,
    ShareModule,
    MyDatePickerModule
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
