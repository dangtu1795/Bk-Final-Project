import * as _ from "lodash";
import {Injectable} from '@angular/core';


declare var unescape;

@Injectable()
export class UtilService {

  constructor() {
  }

  encodeBase64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode(parseInt('0x' + p1, 16));
    }));
  }

  decodeBase64(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

}
