import { Component, OnInit } from '@angular/core';
import {CourseService} from "../../shared-services/api/course.service";
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../shared-services/notification.service";

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  class;
  constructor(private courseService: CourseService, private activatedRoute: ActivatedRoute, private noti: NotificationService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.class = {};
      this.class['id'] = +params.id;
      this.loadClass();
    })
  }

  async loadClass() {
    try {
      this.noti.startLoading();
      let res = await this.courseService.findClass(this.class.id);
      if(res.success) {
        this.class = res.data;
      }
    } catch (e) {
      this.noti.error({title: 'Error!', message: e.message || 'Failed.'})
    } finally {
      this.noti.stopLoading();
    }
  }

}
