import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from "./admin.component";
import {RouterModule} from "@angular/router";
import { MajorListComponent } from './major-list/major-list.component';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { UserComponent } from './user/user.component';
import {FacultyDetailComponent} from "./major-detail/faculty-detail.component";
import {FormsModule} from "@angular/forms";
import {MyDatePickerModule} from "../share-components/my-date-picker/my-date-picker.module";
import {TableComponent} from "../components/table/table.component";
import {ShareModule} from "../share-components/share.module";

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
      path: 'faculty/:id', component: FacultyDetailComponent
    },
    {
      path: 'faculty/create', component: FacultyDetailComponent
    }
  ]
  }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyDatePickerModule,
    ShareModule,
    RouterModule.forRoot(adminRoute),
  ],
  declarations: [
    AdminComponent,
    MajorListComponent,
    FacultyListComponent,
    ScheduleComponent,
    UserComponent,
    FacultyDetailComponent,
    TableComponent,
  ]
})

export class AdminModule { }
