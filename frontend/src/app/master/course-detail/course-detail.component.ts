import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }

  setLayout(event) {
    let element = event.target.parentElement;
    $(element).addClass("active").siblings(".active").removeClass("active");
    $(element).parent().parent().siblings(".panel-block").attr("class", "panel-block video-list").addClass($(element).attr("rel"));
    return false;
  }

}
