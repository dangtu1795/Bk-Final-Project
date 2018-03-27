import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared-services/api/user.service";
import {AuthenticateService} from "../../shared-services/authenticate.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(private userService: UserService, private authen: AuthenticateService, private router: Router) { }

  ngOnInit() {
  }

  async login() {
    let res = await this.userService.login(this.user);
    console.log("this is response:", res);
    if (res.success) {
      let account = res.data;
      let token = account.token;
      this.authen.updateInfo(token, account);
      if(res.data.role == 'student') {
        this.router.navigateByUrl('/student')
      } else {
        this.router.navigateByUrl('/master')
      }
    }
  }

  goToRegistration() {
    this.router.navigateByUrl('/registration');
  }
}
