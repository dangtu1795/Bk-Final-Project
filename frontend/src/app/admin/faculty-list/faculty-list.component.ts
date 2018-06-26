import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared-services/api/user.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../shared-services/notification.service";
import {AuthenticateService} from "../../shared-services/authenticate.service";

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.css']
})
export class FacultyListComponent implements OnInit {

  constructor(private userService: UserService, private router: Router,
              private authen: AuthenticateService,
              private noti: NotificationService) {
  }

  faculties;

  ngOnInit() {
    this.loadFaculties();
  }

  async loadFaculties() {
    try {
      this.noti.startLoading();
      let res = await this.userService.getFaculties();
      if(res.success) {
        this.faculties = res.data;
      } else {
        if(res.error.code == 103) {
          this.authen.clear();
          this.router.navigateByUrl('/login');
        }
      }
    } catch (e) {
      this.noti.error({title: 'Error!', message: 'Load data failed.'})
    } finally {
      this.noti.stopLoading();
    }
  }

}
