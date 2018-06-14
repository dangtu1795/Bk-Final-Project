import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared-services/api/user.service";
import {AuthenticateService} from "../../shared-services/authenticate.service";
import {Router} from "@angular/router";
import {SocketService} from "../../shared-services/socket.service";
import {NotificationService} from "../../shared-services/notification.service";

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

  errors = {};

  constructor(private userService: UserService,
              private socketService: SocketService,
              private noti: NotificationService,
              private authen: AuthenticateService,
              private router: Router) {
  }

  ngOnInit() {
    if(this.authen.token){
      this.router.navigateByUrl('/student')
    }
  }

  async login() {
    try {
      this.noti.startLoading();
      let res = await this.userService.login(this.user);
      if (res.success) {
        this.noti.success({title: 'Congratulation', message: 'Welcome to BKE!'});
        if (['student', 'master', 'admin'].indexOf(res.data.role) < 0) {
          return alert('Account is not valid, Please try another');
        }
        let account = res.data;
        let token = res.token;
        this.authen.updateInfo(token, account);
        this.socketService.connectSocket();
        if (res.data.role == 'student') {
          this.router.navigateByUrl('/student')
        } else if(res.data.role == 'master') {
          this.router.navigateByUrl('/master')
        } else {
          this.router.navigateByUrl('/admin');
        }
      } else {
        this.errors[res.error.data.key] = res.error.message;
      }
    } catch (e) {
      this.noti.error({title: 'Error!', message: e.message || 'Login fail!'})
    } finally {
      this.noti.stopLoading()
    }

  }

  goToRegistration() {
    this.router.navigateByUrl('/registration');
  }

  onModelChange(key) {
    delete this.errors[key];
  }
}
