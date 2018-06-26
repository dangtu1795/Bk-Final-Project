import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared-services/api/user.service";
import {Router} from "@angular/router";
import {AuthenticateService} from "../../shared-services/authenticate.service";
import {NotificationService} from "../../shared-services/notification.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  Schedules = [];

  constructor(private userService: UserService, private router: Router,
              private authen: AuthenticateService,
              private noti: NotificationService) {
  }

  async ngOnInit() {
    let res = await this.userService.getSchedules();
    if (res.success) {
      for (let i = 0; i < 7; i++) {
        this.Schedules.push(res.data.filter(x => x.day_num == i));
      }
    }
  }

}
