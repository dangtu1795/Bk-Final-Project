import {Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange, DoCheck} from '@angular/core';
import {Router} from '@angular/router';
import {IterableDiffers} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, DoCheck, OnChanges {

  @Input()
  headers: any[];

  @Input()
  fields_to_get: any[];

  @Input()
  buttons: any[];

  @Input()
  filter: any[];

  @Input()
  status_place: string;

  @Input()
  status_fields: string;

  @Input()
  is_filter_table;

  @Input()
  is_index;

  data_to_show = [];
  data_sorted = [];
  value_pages = [];

  @Input()
  per_page = 10;

  current_page;
  total_pages = 1;

  status_keyword_green = ['AVAILABLE', 'ACTIVE'];
  status_keyword_blue = [];

  @Input()
  data;

  oldData: string[] = this.data;
  oldLength = 0;

  constructor(
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.data_sorted = this.data;
    this.calc_total_pages();
  }

  calc_total_pages() {
    this.total_pages = Math.ceil(this.data_sorted.length / this.per_page);
    this.current_page = 1;
    this.value_pages = Array.from(Array(this.total_pages).keys()).map(x => x + 1);
    this.assign_view();
  }

  assign_view() {
    this.data_to_show = this.data_sorted.slice((this.current_page - 1) * this.per_page, this.current_page * this.per_page);
  }

  setCurrent(page) {
    this.current_page = page;
    this.assign_view();
  }

  back() {
    this.current_page -= 1;
    this.assign_view();
  }


  next() {
    this.current_page += 1;
    this.assign_view();
  }

  sort(filter) {
    console.log('filter table', filter);
    const keys = Object.keys(filter);
    this.data_sorted = this.data.filter(x => {
      let consider = true;
      keys.forEach(function (_item, index) {
        const _temp = _item.split('-');
        const item = _temp[0];
        console.log(x[item]);
        if (x[item] && typeof x[item] === 'number') {
          x[item] = x[item].toString();
        }

        if (_temp[1] === 'date') {
          const now = new Date();
          const date_part = x[item].split(' ')[0];
          const time_part = x[item].split(' ')[1];

          const year = +date_part.split('-')[0];
          const month = +date_part.split('-')[1];
          const day = +date_part.split('-')[2];

          const hour = +time_part.split(':')[0];
          const min = +time_part.split(':')[1];
          const compare_time = new Date(year, month - 1, day, hour, min);
          if (filter[_item] === 'coming') {
            if (now > compare_time) {
              consider = false;
            }
          } else if (filter[_item] === 'past') {
            if (now < compare_time) {
              consider = false;
            }
          }
        } else {
          if (_temp[1] === 'text') {
            const lower_x = x[item].toLowerCase();
            const lower_filter = filter[_item].toLowerCase();
            if (!lower_x.includes(lower_filter)) {
              if (filter[_item] !== 'all') {
                if (filter[_item] !== '') {
                  consider = false;
                }
              }
            }
          } else {
            const lower_x = x[item];
            console.log('lower x', lower_x);
            const lower_filter = filter[_item];
            console.log('lower_filter', lower_filter);
            if (lower_x !== lower_filter) {
              if (filter[_item] !== 'all') {
                if (filter[_item] !== '') {
                  consider = false;
                }
              }
            }
          }
        }
      });
      if (consider) {
        return x;
      }
    });
    this.current_page = 1;
    this.calc_total_pages();
  }

  button_click(param, my_function) {
    my_function(param);
  }

  isFunction(item) {
    if (typeof item === 'function') {
      return true;
    } else {
      return false;
    }
  }


  ngDoCheck() {
    if (this.oldData !== this.data) {
      this.oldData = this.data;
      this.oldLength = this.data.length;
      this.data_sorted = this.data;
      this.calc_total_pages();
    }
    else {
      let new_length = this.data.length;
      let old_length = this.oldLength;
      if (old_length !== new_length) {
        this.oldLength = new_length;
        this.data_sorted = this.data;
        this.calc_total_pages();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.is_filter_table) {
      if (typeof changes.filter != 'undefined') {
        const filter_change = changes.filter;
        if (!filter_change.firstChange) {
          this.sort(filter_change.currentValue[0]);
        }
      }
    }
  }
}
