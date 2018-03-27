import {Injectable} from "@angular/core";
import {UtilService} from "./util.service";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthenticateService {

  account: any = null;
  token = "";
  __ref = "";
  __secretCode = "";

  public authenInfo: Subject<any> = new Subject();

  constructor(private utilService: UtilService) {
    this.__secretCode = utilService.encodeBase64('enter secret text here');
    this.load();
  }

  updateInfo(token, account) {
    this.token = token;
    this.account = account;
    this.store();
    this.authenInfo.next({
      token: token,
      account: account
    });
  }

  updateAccount(account) {
    this.account = account;
    this.authenInfo.next({
      token: this.token,
      account: this.account
    });
    this.store();
  }

  setRef(url) {
    this.__ref = url;
  }

  getRef(clear = false) {
    let ref = this.__ref;
    if (clear) {
      this.__ref = "";
    }
    return ref;
  }

  store() {
    localStorage.setItem(this.__secretCode, this.utilService.encodeBase64(JSON.stringify({
      token: this.token,
      account: this.account,
    })));
  }

  load() {
    let data: any = {};
    try {
      data = localStorage.getItem(this.__secretCode);
      data = JSON.parse(this.utilService.decodeBase64(data));
      if (data) {
        this.account = data.account;
        this.token = data.token;
        this.authenInfo.next({
          token: data.token,
          account: data.account
        });
      }
    } catch (e) {
      console.error("failed to load saved data")
    }
  }

  clear() {
    this.token = "";
    this.account = {};
    this.__ref = "";
    localStorage.setItem(this.__secretCode, null);
    this.authenInfo.next({
      token: "",
      account: null
    });
  }
}
