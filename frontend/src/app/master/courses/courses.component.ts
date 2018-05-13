import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  setLayout(event) {
    let element = event.target.parentElement;
    $(element).addClass("active").siblings(".active").removeClass("active");
    $(element).parent().parent().siblings(".panel-block").attr("class", "panel-block video-list").addClass($(element).attr("rel"));
    return false;
  }
}
