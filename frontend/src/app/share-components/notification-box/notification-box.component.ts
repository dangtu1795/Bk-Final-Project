import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {SocketService} from "../../shared-services/socket.service";
import List from "../../../libs/List";

@Component({
  selector: 'straw-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.css']
})
export class NotificationBoxComponent implements OnInit {

  @Input("show") show;

  notis = new List();

  constructor(private socketService: SocketService,
              private router: Router) {
  }

  ngOnInit() {
    this.socketService.onNotiCreated.subscribe((data) => {
      this.notis.add(data);
      this.sortNoti();
    });
    this.socketService.onNotiUpdated.subscribe(data => {
      this.notis.add(data);
    });
    this.getNoti();
  }

  async notiClicked(noti) {
    await this.socketService.readNoti(noti.id);
    let data = noti.data;
    switch (noti.role) {
      case 'student':
        this.router.navigateByUrl(`/master/course/${data.course_id}/${data.class_id}`);
        break;
      case 'master':
        this.router.navigateByUrl(`/student/course/${data.course_id}/${data.class_id}`);
        break;
    }
  }

  async getNoti() {
    try {
      let sNotis = await this.socketService.getNoti();
      this.notis.concat((sNotis as any).data);
      this.sortNoti();
      // limit 5 value
      this.notis.asArray().slice(0, 5);
    } catch (e) {
      console.error("cannot get noti", e.message);
    }
  }

  sortNoti() {
    this.notis.sort((a, b) => {
      if (a.created_at < b.created_at) {
        return 1
      }
      if (a.created_at > b.created_at) {
        return -1;
      }
      return 0
    });

  }

}
