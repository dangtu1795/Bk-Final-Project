import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotificationBoxComponent} from "./notification-box/notification-box.component";
import {MyDatePickerModule} from "./my-date-picker/my-date-picker.module";
import {TimepickerModule} from "./timepicker/timepicker.module";
import {SafeHtmlPipe} from "../share-pipes/safe-html.pipe";
import {TimeAgoPipe} from "time-ago-pipe";

@NgModule({
  imports: [
    CommonModule,
    MyDatePickerModule,
    TimepickerModule,
  ],
  declarations: [
    SafeHtmlPipe,
    TimeAgoPipe,
    NotificationBoxComponent
  ]
})
export class ShareModule { }
