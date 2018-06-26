import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../shared-services/notification.service";
import {AuthenticateService} from "../../shared-services/authenticate.service";
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../../shared-services/api/user.service";
import {IMyDpOptions} from "../../share-components/my-date-picker/interfaces/my-options.interface";

@Component({
  selector: 'app-faculty-detail',
  templateUrl: 'faculty-detail.component.html',
  styleUrls: ['faculty-detail.component.css']
})
export class FacultyDetailComponent implements OnInit {

  id;
  Faculty = {
    name: '',
    phone: '',
    email: '',
    website: '',
    overview: '',
    foundation_date: '',
  };

  schedule_start: any;
  DatePickerOptions: IMyDpOptions = {
    highlightSelected: true,
    dateFormat: 'mm-dd-yyyy',
    showTodayBtn: false,
    markCurrentDay: true,
    sunHighlight: false,
    dayLabels: {su: 'S', mo: 'M', tu: 'T', we: 'W', th: 'T', fr: 'F', sa: 'S'},
    monthLabels: {
      1: 'Janu',
      2: 'Febu',
      3: 'Marc',
      4: 'Apri',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'Augu',
      9: 'Sept',
      10: 'Octo',
      11: 'Nove',
      12: 'Dece'
    },
    showClearDateBtn: false,
    showInputField: true,
    editableDateField: false,
    openSelectorOnInputClick: true,
    height: '40px',
    width: '100%',
  };

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authen: AuthenticateService,
              private noti: NotificationService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.loadFaculty()
      }
    })
  }

  async loadFaculty() {
    try {
      this.noti.startLoading();
      let res = await this.userService.getFaculty(this.id);
      if (res.success) {
        this.Faculty = res.data;
        let start_date = new Date(res.data.foundation_date);
        this.schedule_start = {
          date: {
            year: start_date.getFullYear(),
            month: start_date.getMonth() + 1,
            day: start_date.getDate()
          },
          epoc: start_date.getTime() / 1000
        };
      }
    } catch (e) {
      this.noti.error({title: 'Error', message: e.message || 'Failed.'})

    } finally {
      this.noti.stopLoading();
    }
  }

  test() {
    console.log("change value:: ", this.schedule_start);
  }

}
