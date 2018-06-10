import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CourseService} from "../../shared-services/api/course.service";
import {NotificationService} from "../../shared-services/notification.service";

@Component({
  selector: 'app-course-new',
  templateUrl: './course-new.component.html',
  styleUrls: ['./course-new.component.css']
})
export class CourseNewComponent implements OnInit {

  course = {
    description: '',
    name: '',
    outline: ''
  };
  constructor(private router: Router, private courseService: CourseService, private noti: NotificationService) { }

  ngOnInit() {

  }

  async createCourse() {
    try {
      this.noti.startLoading();
      let res = await this.courseService.createCourse(this.course);
      if(res.success) {
        this.noti.success({title: 'Congratulation!', message: 'Create successfuly.'})
        return setTimeout(() => {
          this.router.navigateByUrl('/master/courses')
        },2000)
      }
      this.noti.error({title: 'Error!', message: res.message || 'Failed!'})
    } catch (e) {
      this.noti.error({title: 'Error!', message: e.message || 'Failed!'})
    } finally {
      this.noti.stopLoading();
    }
  }

}
