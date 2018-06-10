import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {CourseService} from "../../shared-services/api/course.service";
import {NotificationService} from "../../shared-services/notification.service";
import {IMyDpOptions} from "../../share-components/my-date-picker/interfaces/my-options.interface";

@Component({
  selector: 'app-class-new',
  templateUrl: './class-new.component.html',
  styleUrls: ['./class-new.component.css']
})
export class ClassNewComponent implements OnInit {

  id;
  isEdit = false;
  course;
  class = {
    name: '',
    note: '',
    capacity: 0
  };
  org_hours = [];
  Members;
  deleteStudent;
  Lectures;
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
    disableUntil: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() - 1},
    editableDateField: false,
    openSelectorOnInputClick: true,
    height: '40px',
    width: '100%',
  };

  weekDayIndex = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday"];

  playerOptions = {
    'fs': 0,
    'modestbranding': 1,
    'showinfo': 1,
    'controls': 0,
    'autohide': 1,
    'autoplay': 0
  };
  constructor(private router: Router, private courseService: CourseService,
              private activatedRoute: ActivatedRoute,
              private noti: NotificationService) {
  }

  async ngOnInit() {
    this.course = this.courseService.course;
    console.log('hello', this.course);
    await this.getSchedules();
    this.activatedRoute.params.subscribe((params: any) => {
      this.id = params.id;
      this.isEdit = true;
      this.loadClass();
    })
  }

  async loadClass() {
    try {
      let res = await this.courseService.findClass(this.id);
      if (res.success) {
        for(let key of Object.keys(this.class)) {
          this.class[key] = res.data[key];
        }
        this.Members = res.data.Members;
        this.Lectures = res.data.Lectures;
        let start_date = new Date(res.data.Schedule.from);
        this.schedule_start = {
          date: {
            year: start_date.getFullYear(),
            month: start_date.getMonth() + 1,
            day: start_date.getDate()
          },
          epoc: start_date.getTime() / 1000
        };

        let end_date = new Date(res.data.Schedule.to);
        this.schedule_end = {
          date: {
            year: end_date.getFullYear(),
            month: end_date.getMonth() + 1,
            day: end_date.getDate()
          },
          epoc: end_date.getTime() / 1000
        };

        for(let item of res.data.Schedule.hours) {
          for(let hour of this.Hours[item.day_num]) {
            if(hour.id == item.id) {
              hour.selected = true;
              this.Schedules.push(item);
            }
          }
          this.weekDayMark.push(item.day_num);
          this.org_hours.push(item.id);
        }

         console.log('load class: ', res.data);
         console.log('org hours: ', this.org_hours);
         return console.log('schedule: ', this.Schedules);

      }
      this.noti.error({title: 'Error', message: res.error.message || 'Failed.'})
    } catch (e) {
      this.noti.error({title: 'Error', message: e.message || 'Failed.'})
    }
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
      let res;
      if(this.isEdit) {
        let new_hours = [];
        let delete_hours = [];
        for(let hour of data.hours) {
          if(this.org_hours.indexOf(hour) == -1) {
            new_hours.push(hour);
          }
        }

        for(let hour of this.org_hours) {
          if(data.hours.indexOf(hour) == -1) {
            delete_hours.push(hour)
          }
        }
        data.hours = new_hours;
        data.remove_hours = delete_hours;
        res = await this.courseService.updateClass(this.id, data);
      } else {
        res = await this.courseService.createClass(data);
      }
      if (res.success) {
        this.noti.success({title: 'Congratulation', message: 'Create successfully.'});
        return setTimeout(() => {
          this.router.navigateByUrl(`master/course/${this.course.id}`)
        }, 1500)
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
    this.currentDay = item.day_num;
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

  async eliminateStudent() {
    this.noti.startLoading();
    try{
      let res: any = await this.courseService.eliminateStudent({
        student_id: this.deleteStudent.id,
        class_id: this.id
      });
      if(res.success) {
        console.log(res);
        this.Members = this.Members.filter(x => x.id != this.deleteStudent.id);
        this.deleteStudent = null;
        return this.noti.success({title: 'Congratulation!', message: 'The student has been deleted.'})
      }
      this.noti.error({title: 'Error!', message: res.message || 'Failed.'})
    } catch (e) {
      this.noti.error({title: 'Error!', message: e.message || 'Failed.'})
    } finally {
      $('#myModal').modal('hide');
      this.noti.stopLoading();
    }
  }

}
