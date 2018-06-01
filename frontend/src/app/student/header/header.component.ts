import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from "../../shared-services/authenticate.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authen: AuthenticateService, private router: Router) { }

  user;
  NOW;
  ngOnInit() {
    this.NOW = new Date();
    this.user = this.authen.account;
    console.log('user here: ', this.user)
    this.authen.authenInfo.subscribe(data => {
      this.user = data.account;
    })
  }

  logout() {
    this.authen.clear();
    this.router.navigateByUrl('/login');
  }

}
