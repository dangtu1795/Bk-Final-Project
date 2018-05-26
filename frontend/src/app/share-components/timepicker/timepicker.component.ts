import {
  Component, EventEmitter, forwardRef, Injector, Input, OnChanges, OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, NgModel} from "@angular/forms";

export class TimePickerOptions {
  timeFormat?: string = 'hh:mm p';
  minHour?: number = null;
  minMinutes?: number = null;
  minTime?: Date | string = null;
  maxHour?: number = null;
  maxMinutes?: number = null;
  maxTime?: Date | string = null;
  startHour?: number = null;
  startMinutes?: number = null;
  startTime?: Date | string = null;
  interval?: number = 30;
  dynamic?: boolean = false;
  theme?: 'standard' | "standard-rounded-corners" = 'standard';
  zindex?: number = null;
  dropdown?: boolean = true;
  scrollbar?: boolean = false;
  valueType?: 'time' | 'time_str' | "time_num" | "raw" = "time";
  disableTyping?: boolean = false
}

export class TimeData {
  time: Date;
  time_str: string;
  time_num: number;
}

@Component({
  selector: 'my-time-picker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimepickerComponent),
      multi: true
    }
  ]
})
export class TimepickerComponent implements OnInit, ControlValueAccessor {

  @Input() options: TimePickerOptions;
  @Input() className: string;
  @ViewChild("picker") picker;
  @Output() change: EventEmitter<TimeData> = new EventEmitter();

  private _timepicker;
  private _valueType;

  constructor(private injector: Injector) {
  }

  ngOnInit() {
    this._valueType = this.options && this.options.valueType || "time";
    jQuery(this.picker.nativeElement).timepicker(Object.assign(this.options, {
      change: time => {
        let widget = this._timepicker;
        let data = {
          time: time,
          time_str: widget.format(time),
          time_num: time.getHours() * 60 + time.getMinutes()
        };
        this.onUpdate(data);
        this.change.emit(data);
      }
    }));
    this._timepicker = jQuery(this.picker.nativeElement).timepicker();
  }

  private onUpdate(data) {
    let model = this.injector.get(NgModel);
    this.writeValue(data);
    model.viewToModelUpdate(this._valueType === "raw" ? data : data[this._valueType]);
  }

  writeValue(obj: number | string | TimeData): void {
    if (obj == null || obj === undefined) {
      return;
    }
    let widget = this._timepicker;
    let value;
    if (typeof obj === "number") {
      let hour = ~~(obj / 60);
      let min = obj % 60;
      value = new Date();
      value.setHours(hour, min, 0, 0);
    }
    if (typeof obj === "string") {
      value = widget.parse(obj);
    }
    if (typeof obj === "object") {
      value = obj.time || widget.parse(obj.time_str);
    }
    let formattedValue = widget.format(value);
    if (widget.element[0].value !== formattedValue) {
      widget.element[0].value = formattedValue;
    }
  }

  onChange = (_: any) => {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

}
