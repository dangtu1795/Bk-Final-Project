import { Component, OnInit } from '@angular/core';
import {CourseService} from "../../shared-services/api/course.service";
import {NotificationService} from "../../shared-services/notification.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses;
  constructor(private courseService: CourseService, private noti: NotificationService) { }

  async ngOnInit() {
    try {
      this.noti.startLoading();
      let res = await this.courseService.getCourse();
      if(res.success) {
        this.courses = res.data;
        this.noti.success({title: 'Congrastulation!', message: 'Course loading successfully.'})
      }
    } catch (e) {
      this.noti.success({title: 'Error!', message: 'Course loading failed.'})
    } finally {
      this.noti.stopLoading();
    }
  }

  setLayout(event) {
    let element = event.target.parentElement;
    $(element).addClass("active").siblings(".active").removeClass("active");
    $(element).parent().parent().siblings(".panel-block").attr("class", "panel-block video-list").addClass($(element).attr("rel"));
    return false;
  }
}
