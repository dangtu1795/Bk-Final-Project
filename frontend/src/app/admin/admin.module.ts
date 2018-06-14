import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from "./admin.component";
import {RouterModule} from "@angular/router";
import { MajorListComponent } from './major-list/major-list.component';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { ScheduleComponent } from './schedule/schedule.component';

const adminRoute = [{
  path: 'admin', component: AdminComponent,
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(adminRoute),
  ],
  declarations: [AdminComponent, MajorListComponent, FacultyListComponent, ScheduleComponent]
})

export class AdminModule { }
