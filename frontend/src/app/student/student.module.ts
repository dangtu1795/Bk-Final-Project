import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import {RouterModule} from "@angular/router";
import {YoutubePlayerModule} from "ngx-youtube-player";

const studentRoute = [
  {
    path: 'student', component: StudentComponent,
    children: [
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(studentRoute),
    YoutubePlayerModule
  ],
  declarations: [StudentComponent]
})
export class StudentModule { }
