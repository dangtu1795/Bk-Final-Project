import {Injectable} from '@angular/core';
import {ToastData, ToastOptions, ToastyConfig, ToastyService} from "ng2-toasty";
import {environment} from "environments/environment";

export enum Noty {DEFAULT, INFO, SUCCESS, WAIT, ERROR, WARNING}

export class ToastInput {
  title: string;
  message: string;
}

declare type ToastCallBack = (toastData: ToastData) => void;

@Injectable()
export class NotificationService {

  isLoading = false;

  constructor(private toastyService: ToastyService,
              private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'default';
    // Or create the instance of ToastOptions
    if (!environment.production) {
      this.toastyService.default("Hi there, im running fine!<br>You are in debug mode");
    }
  }

  public show({title, message}, type: Noty, onAddCb?: ToastCallBack, onRemoveCb?: ToastCallBack) {
    let toastOptions: ToastOptions = <ToastOptions>{
      title: title,
      msg: message,
      showClose: true,
      timeout: 5000,
      onAdd: (toast: ToastData) => {
        if (onAddCb) {
          onAddCb(toast);
        }
      },
      onRemove: function (toast: ToastData) {
        if (onRemoveCb) {
          onRemoveCb(toast)
        }
      }
    };

    switch (type) {
      case Noty.DEFAULT:
        return this.toastyService.default(toastOptions);
      case Noty.INFO:
        return this.toastyService.info(toastOptions);
      case Noty.SUCCESS:
        return this.toastyService.success(toastOptions);
      case Noty.WAIT:
        return this.toastyService.wait(toastOptions);
      case Noty.ERROR:
        return this.toastyService.error(toastOptions);
      case Noty.WARNING:
        return this.toastyService.warning(toastOptions);
    }
  }

  public default(data: ToastInput, onAdd?: ToastCallBack, onRemove?: ToastCallBack) {
    return this.show(data, Noty.DEFAULT, onAdd, onRemove);
  }

  public info(data: ToastInput, onAdd?: ToastCallBack, onRemove?: ToastCallBack) {
    return this.show(data, Noty.INFO, onAdd, onRemove);
  }

  public success(data: ToastInput, onAdd?: ToastCallBack, onRemove?: ToastCallBack) {
    return this.show(data, Noty.SUCCESS, onAdd, onRemove);
  }

  public wait(data: ToastInput, onAdd?: ToastCallBack, onRemove?: ToastCallBack) {
    return this.show(data, Noty.WAIT, onAdd, onRemove);
  }

  public error(data: ToastInput, onAdd?: ToastCallBack, onRemove?: ToastCallBack) {
    return this.show(data, Noty.ERROR, onAdd, onRemove);
  }

  public warning(data: ToastInput, onAdd?: ToastCallBack, onRemove?: ToastCallBack) {
    return this.show(data, Noty.WARNING, onAdd, onRemove);
  }

  startLoading() {
    if (this.isLoading) {
      return;
    }
    $('body').append(`<any id = "globalloading"
    style = "top:0;
    left: 0;
    height:100vh;
    width:100vw;
    position:fixed;
    opacity:0.9;
    background: rgb(255,255,255);
    z-index: 99999;
    background-image: url(../../../assets/images/Loading_icon.gif);
    background-position:center;
    background-repeat:no-repeat;"
    ></any>`);
    this.isLoading = true;
  }

  stopLoading() {
    $('#globalloading').remove();
    this.isLoading = false;
  }

}
