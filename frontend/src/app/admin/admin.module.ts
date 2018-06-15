import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from "./admin.component";
import {RouterModule} from "@angular/router";
import { MajorListComponent } from './major-list/major-list.component';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { UserComponent } from './user/user.component';
import {MajorDetailComponent} from "./major-detail/major-detail.component";

const adminRoute = [
  {
    path: 'admin', component: AdminComponent, children: [
    {
      path: '', redirectTo: 'faculty', pathMatch: 'full'
    },
    {
      path: 'faculty', component: FacultyListComponent
    },
    {
      path: 'user', component: UserComponent
    },
    {
      path: 'schedule', component: ScheduleComponent
    },
    {
      path: 'faculty/:id', component: MajorListComponent
    },
    {
      path: 'faculty/create', component: MajorListComponent
    }
    ,
    {
      path: 'major/:id', component: MajorDetailComponent
    }
  ]
  }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(adminRoute),
  ],
  declarations: [AdminComponent, MajorListComponent, FacultyListComponent, ScheduleComponent, UserComponent, MajorDetailComponent]
})

export class AdminModule { }
