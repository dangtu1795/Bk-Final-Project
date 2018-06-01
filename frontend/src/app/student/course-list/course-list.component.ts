import { Component, OnInit } from '@angular/core';
import {CourseService} from "../../shared-services/api/course.service";
import {NotificationService} from "../../shared-services/notification.service";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses;
  constructor(private courseService: CourseService, private noti: NotificationService) { }

  async ngOnInit() {
    try {
      this.noti.startLoading();
      let res = await this.courseService.getCourse();
      this.noti.success({title: 'Congratulation!', message: 'Courses loading successfully!'});
      this.courses = res.data;
    } catch (e) {
      this.noti.error({title: 'Error!', message: e.message || 'Courses loading failed!'})
    } finally {
      this.noti.stopLoading();
    }

  }

}
