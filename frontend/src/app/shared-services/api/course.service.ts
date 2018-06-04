import { Injectable } from '@angular/core';
import {HttpService} from "../http.service";
import {Subject} from "rxjs";

@Injectable()
export class CourseService {

  public course;
  constructor(private http: HttpService) { }

  findClass(id) {
    return this.http.get(`class/${id}`).toPromise();
  }

  createClass(data) {
    return this.http.post('class', data).toPromise();
  }

  getLecture() {
    return this.http.get('lecture').toPromise();
  }

  getCourse() {
    return this.http.get('course').toPromise();
  }

  createCourse(data) {
    return this.http.post('course', data).toPromise();
  }

  getCourseById(id) {
    return this.http.get(`course/${id}`).toPromise();
  }

  joinClass(id) {
    return this.http.get(`class/request/${id}`).toPromise();
  }

  getMyClasses() {
    return this.http.get('class/me').toPromise();
  }

  getHours() {
    return this.http.get('hour').toPromise();
  }
}
