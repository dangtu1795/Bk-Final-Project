import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../shared-services/notification.service";
import {CourseService} from "../../shared-services/api/course.service";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course;

  constructor(private courseService: CourseService, private activatedRoute: ActivatedRoute, private noti: NotificationService) {
  }

  ngOnInit() {
    this.course = {};
    this.activatedRoute.params.subscribe((params: any) => {
      this.course['id'] = params.id;
      console.log('params', params)
      this.loadCourse();
    })

  }

  setLayout(event) {
    let element = event.target.parentElement;
    $(element).addClass("active").siblings(".active").removeClass("active");
    $(element).parent().parent().siblings(".panel-block").attr("class", "panel-block video-list").addClass($(element).attr("rel"));
    return false;
  }

  async loadCourse() {
    try {
      this.noti.startLoading();
      let res = await this.courseService.getCourseById(this.course['id']);
      if (res.success) {
        this.noti.success({title: 'Congratulation!', message: 'Course loading successfully.'});
        this.course = res.data;
        this.courseService.course = res.data;
      } else {
        this.noti.error({title: 'Error!', message: res.error.message || 'Fail!'})
      }

    } catch (e) {
      this.noti.error({title: 'Error!', message: e.message || 'Fail!'})
    } finally {
      this.noti.stopLoading();
    }
  }

}
