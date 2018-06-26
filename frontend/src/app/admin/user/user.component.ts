import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared-services/api/user.service";
import {Router} from "@angular/router";
import {AuthenticateService} from "../../shared-services/authenticate.service";
import {NotificationService} from "../../shared-services/notification.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router,
              private authen: AuthenticateService,
              private noti: NotificationService) {
  }
  masters = [];
  students = [];

  async ngOnInit() {
    try {
      this.noti.startLoading();
      let res = await this.userService.getUser();
      if (res.success) {
        this.students = res.data[0];
        this.masters = res.data[1];
      }
    } catch (e) {

    } finally {
      this.noti.stopLoading();
    }
  }

}
