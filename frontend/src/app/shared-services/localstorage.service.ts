import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  private _localStorage = window.localStorage;
  constructor() { 
    
  }

  isExist(key) {
    return !!this._localStorage.getItem(key);
  }

  setItem(key:string, data:any, updateOnConflict = false) {
    if (!data) throw Error('Missing data');
    try {
      let dataStr = JSON.stringify(data);
      
      if (updateOnConflict) {
        this._localStorage.setItem(key, dataStr);
        return data;
      }

      if (this.isExist(key)) {
        return console.error(`Key ${key} existed`);
      }

      this._localStorage.setItem(key, dataStr)
      
    } catch (error) {
      console.error(error);
    }
  }

  getItem(key:string) {
    let dataStr = this._localStorage.getItem(key);
    try {
      let data = JSON.parse(dataStr);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  removeItem(key:string) {
    this._localStorage.removeItem(key);
  }

  get localStorage() {
    return this._localStorage;
  }

}
