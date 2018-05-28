import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared-services/api/user.service";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses;
  constructor(private userService: UserService) { }

  async ngOnInit() {
    let res = await this.userService.getCourse();
    this.courses = res.data;
    console.log(res);
  }

}
