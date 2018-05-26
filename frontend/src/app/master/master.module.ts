import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MasterComponent} from './master.component';
import {RouterModule} from "@angular/router";
import {CoursesComponent} from './courses/courses.component';
import {CourseDetailComponent} from './course-detail/course-detail.component';
import {WatchCourseDetailComponent} from './watch-course-detail/watch-course-detail.component';
import {QuestionComponent} from './question/question.component';
import { ClassComponent } from './class/class.component';
import { CourseNewComponent } from './course-new/course-new.component';
import { ClassNewComponent } from './class-new/class-new.component';


const masterModule = [
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
                path: 'course/:id', component: CourseDetailComponent
            },

            {
                path: 'course/:id/watch', component: WatchCourseDetailComponent
            },
            {
                path: 'course/:id/question', component: QuestionComponent
            }



        ]
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(masterModule)
    ],
    declarations: [MasterComponent, CoursesComponent, CourseDetailComponent, WatchCourseDetailComponent, QuestionComponent, ClassComponent, CourseNewComponent, ClassNewComponent]
})
export class MasterModule {
}
