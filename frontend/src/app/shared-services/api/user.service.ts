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

  login1(formData) {
    return this.http.postForm('login',formData).toPromise();
  }
}
