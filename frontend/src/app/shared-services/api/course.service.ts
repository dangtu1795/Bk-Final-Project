import { Injectable } from '@angular/core';
import {HttpService} from "../http.service";

@Injectable()
export class CourseService {

  constructor(private http: HttpService) { }

  findClass(id) {
    return this.http.get(`class/${id}`)
  }
}
