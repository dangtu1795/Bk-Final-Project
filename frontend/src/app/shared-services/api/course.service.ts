import { Injectable } from '@angular/core';
import {HttpService} from "../http.service";
import {Subject} from "rxjs";

@Injectable()
export class CourseService {

  public course;
  public class_id;
  constructor(private http: HttpService) { }

  findClass(id) {
    return this.http.get(`class/${id}`).toPromise();
  }

  createClass(data) {
    return this.http.post('class', data).toPromise();
  }

  updateClass(id, data) {
    return this.http.put(`class/${id}`, data).toPromise();
  }

  getLecture(id) {
    return this.http.get(`lecture/${id}?class_id=${this.class_id}`).toPromise();
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

  eliminateStudent(data) {
    return this.http.post('class/request', data).toPromise();
  }

  getMyClasses() {
    return this.http.get('class/me').toPromise();
  }

  getHours() {
    return this.http.get('hour').toPromise();
  }
}
