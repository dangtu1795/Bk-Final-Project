import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../../shared-services/api/course.service";
import {NotificationService} from "../../shared-services/notification.service";

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {

  id;
  Class;

  constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService, private noti: NotificationService) {
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    try {
      let res = await this.courseService.findClass(this.id);
      if (res.success) {
        this.Class = res.data;
        this.noti.success({title: 'Congratulation!', message: 'Class loading successfully!'});
      }

    } catch (e) {
      this.noti.error({title: 'Error', message: 'Class loading failed!'});
    } finally {
      this.noti.stopLoading();
    }
  }

  async requestJoinClass() {
    try {
      let res = await this.courseService.joinClass(this.id);
      if (res.success) {
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    } catch (e) {
      alert('Request join class fail!');
      console.log(e)
    }
  }

}
