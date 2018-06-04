import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scheduleTime'
})
export class TimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value) {
      let hour = value / 60;
      let s_hour = hour < 10? `0${hour}` : hour;
      let minute = value % 60
      let s_minute = minute < 10? `0${minute}` : minute
      return `${s_hour}:${s_minute}`;
    }
    return "";
  }

}
