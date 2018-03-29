import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import {RouterModule} from "@angular/router";
import {YoutubePlayerModule} from "ngx-youtube-player";
import { HeaderComponent } from './header/header.component';

const studentRoute = [
  {
    path: 'student', component: StudentComponent,
    children: [
      {
        path: '', component: HeaderComponent
      }
      ,{
        path: 'header', component: HeaderComponent
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
  declarations: [StudentComponent, HeaderComponent]
})
export class StudentModule { }
