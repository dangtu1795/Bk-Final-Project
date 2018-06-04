import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CourseService} from "../../shared-services/api/course.service";
import {NotificationService} from "../../shared-services/notification.service";
import {IMyDpOptions} from "../../share-components/my-date-picker/interfaces/my-options.interface";

@Component({
  selector: 'app-class-new',
  templateUrl: './class-new.component.html',
  styleUrls: ['./class-new.component.css']
})
export class ClassNewComponent implements OnInit {

  course;
  class = {
    name: '',
    note: '',
    capacity: 0
  };
  Hours = [];
  Schedules = [];
  schedule_start: any;
  schedule_end: any;
  weekDayMark = [];
  permanentDatePickerOptions: IMyDpOptions = {
    showWeekDayOnly: true,
    highlightDays: this.weekDayMark,
    highlightSelected: false,
    dateFormat: 'dd-mm-yyyy',
    showTodayBtn: false,
    markCurrentDay: false,
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
    inline: true
  };
  startingDatePickerOptions: IMyDpOptions = {
    highlightSelected: false,
    dateFormat: 'mm-dd-yyyy',
    showTodayBtn: false,
    markCurrentDay: false,
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
    disableUntil: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() - 1},
    editableDateField: false,
    openSelectorOnInputClick: true,
    height: '40px',
    width: '100%',
  };

  weekDayIndex = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday"];

  constructor(private router: Router, private courseService: CourseService, private noti: NotificationService) {
  }

  ngOnInit() {
    this.course = this.courseService.course;
    console.log('hello', this.course);
    this.getSchedules();
  }

  async getSchedules() {
    try {
      let res = await this.courseService.getHours();
      if (res.success) {
        for (let i = 0; i < 7; i++) {
          this.Hours.push(res.data.filter(x => x.day_num == i));
        }
        return console.log('Hours: ', this.Hours);
      }
      this.noti.error({title: 'Error', message: res.error.message || 'Failed.'})
    } catch (e) {
      this.noti.error({title: 'Error', message: e.message || 'Failed.'})
    }
  }

  currentDay;

  onDateChanged(event) {
    console.log(event);
    this.currentDay = event.dayOfWeek;
    $("#modalSetTimeNormal").modal('show');
  }

  test() {
    console.log("change value:: ", this.schedule_start);
  }

  async createClass() {
    try {
      this.noti.startLoading();
      let data = Object.assign(
        {},
        this.class,
        {hours: [...this.Schedules.map(x => x.id)]},
        {CourseId: this.course.id},
        {
          from: this.schedule_start.formatted,
          to: this.schedule_end.formatted
        });
      console.log('data is: ', data);
      let res = await this.courseService.createClass(data);
      if (res.success) {
        this.noti.success({title: 'Congratulation', message: 'Create successfully.'});
        return setTimeout(() => {
          this.router.navigateByUrl(`master/course/${this.course.id}`)
        }, 2000)
      }
    } catch (e) {
      this.noti.error({title: 'Error!', message: e.message || "Failed!"})
    } finally {
      this.noti.stopLoading();
    }
  }

  selectTime(item) {
    for (let hour of this.Hours[this.currentDay]) {
      if (hour.id == item.id) {
        hour.selected = true;
      } else {
        if (hour.selected) {
          this.Schedules = this.Schedules.filter(x => x.id != hour.id);
        }
        hour.selected = false;
      }
    }
    console.log(item);
    this.Schedules.push(item);
    if (this.weekDayMark.indexOf(this.currentDay > -1)) {
      this.weekDayMark.push(this.currentDay);
    }
    console.log(this.weekDayMark);
  }

  removeTime(item) {
    for (let hour of this.Hours[this.currentDay]) {
      if (hour.id == item.id) {
        hour.selected = false;
      }
    }
    this.Schedules = this.Schedules.filter(x => x.id != item.id);
    let index = this.weekDayMark.indexOf(this.currentDay);
    this.weekDayMark.splice(index, 1);
  }

  editSchedule(hour) {
    this.currentDay = hour.day_num;
    $('#modalSetTimeNormal').modal('show');
  }

}
