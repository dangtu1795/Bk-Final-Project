import {Injectable} from '@angular/core';
import {HttpService} from "../http.service";
import {UtilService} from "../util.service";

@Injectable()
export class UserService{


  constructor(private http: HttpService, private utils: UtilService) {
  }

  login(data) {
    if (!data.email) {
      throw new Error("Missing email");
    }

    if (!data.password) {
      throw new Error("Missing password");
    }

    return this.http.post('login', data).toPromise();
  }

  registration(data) {
    return this.http.post('user', data).toPromise();
  }

  getUser() {
    return this.http.get('user').toPromise();
  }

  getSchedules() {
    return this.http.get('hour').toPromise();
  }

  createHour(data) {
    return this.http.post('hour', data).toPromise();
  }

  getFaculties() {
    return this.http.get('faculty').toPromise();
  }

  getFaculty(id) {
    return this.http.get(`faculty/${id}`).toPromise();
  }

  createFaculty(data) {
    return this.http.post('faculty', data).toPromise();
  }

  createMajor(data) {
    return this.http.post('major', data).toPromise();
  }

  async checkToken(token) {
    return this.http.post("token/check", {token}).toPromise();
  }
}
