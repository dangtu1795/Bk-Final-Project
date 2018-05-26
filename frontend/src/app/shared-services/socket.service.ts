import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {AuthenticateService} from './authenticate.service';
import {environment} from '../../environments/environment';
import {Subject} from "rxjs/Subject";

const CONFIG = environment || {
  serverSocket: ''
};

@Injectable()
export class SocketService {
  private _socket: any;
  private _listener = {};
  jwt: any;

  onNotiCreated = new Subject<any>();
  onNotiUpdated = new Subject<any>();

  constructor(private authenService: AuthenticateService) {
    try {
      this.jwt = authenService.token;
      authenService.authenInfo.subscribe(info => {
        let oldToken = this.jwt;
        this.jwt = info.token;
        if (oldToken !== info.token && !!info.token) {
          this.connectSocket();
        }
      });
      this.connectSocket();

    } catch (e) {
      console.error('Kết nối _socket thất bại : ', e.stack);
    }
  }

  register(event, cb) {
    if (!this._listener[event]) {
      this._listener[event] = [];
      this._socket.on(event, (data) => {
        if (!environment.production) {
          console.log(event, data);
        }
        this._listener[event].forEach(cb => {
          cb(data);
        })
      })
    }
    this._listener[event].push(cb);
  }

  connectSocket() {
    this.disconnectSocket();
    this._socket = io(`${CONFIG.serverSocket}/`);
    this._listener = {};
    this._socket.on('connect', async (_socket) => {
      if (!environment.production) {
        console.log("Connect to server succesful ", this._socket.id);
      }
      let rs = await this.emit('login', {});
    });

    this.register("NOTI_CREATED", data => {
      this.onNotiCreated.next(data);
    });
    this.register("NOTI_UPDATED", data => {
      this.onNotiUpdated.next(data);
    })

  }

  disconnectSocket() {
    if (this._socket) {
      this._socket.disconnect();
    }
  }

  on(code, cb) {
    this._socket.on(code, cb)
  }

  emit(code, data) {
    data['token'] = this.jwt;
    return new Promise((resolve, reject) => {
      this._socket.emit(code, data, (res) => {
        if (!environment.production) {
          console.log(code, data, res);
        }
        if (res.success) {
          resolve(res);
        } else {
          reject(res.error);
        }
      });
    });
  }


  async getNoti(pagination?: any) {
    let _pagination = Object.assign({}, pagination || {});
    return this.emit("GET noti", _pagination);
  }

  async readNoti(id?: number) {
    if (id) {
      return this.emit("POST noti/read", {noti_id: id});
    } else {
      return this.emit("POST noti/read", {check_point: new Date()});
    }

  }

  async readRoom(id: number) {
    return this.emit("POST room/read", {room_id: id});
  }
}
