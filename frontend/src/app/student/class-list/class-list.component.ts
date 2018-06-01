import { Component, OnInit } from '@angular/core';
import {CourseService} from "../../shared-services/api/course.service";
import {TimePickerOptions} from "../../share-components/timepicker/timepicker.component";
import {IMyDpOptions} from "../../share-components/my-date-picker/interfaces/my-options.interface";
import {NotificationService} from "../../shared-services/notification.service";

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {

  classes;
  weekDayIndex = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday"];
  constructor(private courseService: CourseService, private notiService: NotificationService) { }

  async ngOnInit() {
    try {
      this.notiService.startLoading();
      let res = await this.courseService.getMyClasses();
      if(res.success) {
        this.notiService.success({title: 'Congratulation!', message: 'Class loading successfully!'});
        this.classes = res.data;
      }
    } catch (e) {
      this.notiService.error({title: 'Error!', message: e.message || 'Class loading failed!'})
    } finally {
      this.notiService.stopLoading();
    }
  }


  ParseInt(num) {
    return parseInt(num)
  }

}
