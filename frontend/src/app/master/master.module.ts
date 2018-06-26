import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MasterComponent} from './master.component';
import {RouterModule} from "@angular/router";
import {CoursesComponent} from './courses/courses.component';
import {CourseDetailComponent} from './course-detail/course-detail.component';
import {WatchCourseDetailComponent} from './watch-course-detail/watch-course-detail.component';
import {QuestionComponent} from './question/question.component';
import {ClassComponent} from './class/class.component';
import {CourseNewComponent} from './course-new/course-new.component';
import {ClassNewComponent} from './class-new/class-new.component';
import {ShareModule} from "../share-components/share.module";
import {FormsModule} from "@angular/forms";
import {MyDatePickerModule} from "../share-components/my-date-picker/my-date-picker.module";
import {TimePipe} from "../share-pipes/time.pipe";
import {YoutubePlayerModule} from "ngx-youtube-player";


const masterRoute = [
  {
    path: 'master', component: MasterComponent,
    children: [
      {
        path: '', redirectTo: 'courses', pathMatch: 'full',
      },
      {
        path: 'courses', component: CoursesComponent
      },
      {
        path: 'course-new', component: CourseNewComponent
      },
      {
        path: 'course/:id', component: CourseDetailComponent
      },
      {
        path: 'course/:id/class-new', component: ClassNewComponent
      },
      {
        path: 'course/:id/watch', component: WatchCourseDetailComponent
      },
      {
        path: 'course/:id/question', component: QuestionComponent
      },
      {
        path: 'course/:id/class/:class_id', component: ClassNewComponent
      },


    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(masterRoute),
    MyDatePickerModule,
    YoutubePlayerModule,
    ShareModule
  ],
  declarations: [
    MasterComponent,
    CoursesComponent,
    CourseDetailComponent,
    WatchCourseDetailComponent,
    QuestionComponent,
    ClassComponent,
    CourseNewComponent,
    ClassNewComponent
  ]
})
export class MasterModule {
}
