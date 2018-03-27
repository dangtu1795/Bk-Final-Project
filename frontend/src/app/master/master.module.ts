import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './master.component';
import {RouterModule} from "@angular/router";

const masterModule = [
  {
    path: 'master', component: MasterComponent,
    children: [
      {
        path: '', component: MasterComponent
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(masterModule)
  ],
  declarations: [MasterComponent]
})
export class MasterModule { }
