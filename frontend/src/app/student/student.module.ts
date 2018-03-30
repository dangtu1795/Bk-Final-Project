import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import {RouterModule} from "@angular/router";
import {YoutubePlayerModule} from "ngx-youtube-player";
import { HeaderComponent } from './header/header.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';

const studentRoute = [
  {
    path: 'student', component: StudentComponent,
    children: [
      {
        path: 'profile', component: StudentProfileComponent
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(studentRoute),
    YoutubePlayerModule
  ],
  declarations: [StudentComponent, HeaderComponent, StudentProfileComponent]
})
export class StudentModule { }
