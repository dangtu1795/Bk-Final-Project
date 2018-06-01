import { Injectable } from '@angular/core';
import {HttpService} from "../http.service";

@Injectable()
export class CourseService {

  constructor(private http: HttpService) { }

  findClass(id) {
    return this.http.get(`class/${id}`).toPromise();
  }

  getLecture() {
    return this.http.get('lecture').toPromise();
  }

  getCourse() {
    return this.http.get('course').toPromise();
  }

  joinClass(id) {
    return this.http.get(`class/request/${id}`).toPromise();
  }

  getMyClasses() {
    return this.http.get('class/me').toPromise();
  }
}
