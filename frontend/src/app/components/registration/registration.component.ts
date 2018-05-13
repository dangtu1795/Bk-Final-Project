import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../shared-services/api/user.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {
  }

  user = {
    name: '',
    phone: '',
    email: '',
    password: '',
    password_confirm: '',
    gender: 'male',
    role: ''
  };

  errors = {};

  ngOnInit() {
  }

  gotoLogin() {
    this.router.navigateByUrl('/login')
  }

  async registation() {
    console.log(this.user)
    let res = await this.userService.registration(this.user);
    if(res.success) {
      this.gotoLogin();
    } else {
      this.errors[res.error.data.key] = res.error.message;
    }
  }

  onModelChange(key) {
    delete this.errors[key];
  }

}
