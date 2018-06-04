import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticateService} from "../shared-services/authenticate.service";
import {UserService} from "../shared-services/api/user.service";

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  constructor(private router: Router, private authen: AuthenticateService, private userService: UserService) { }

  async ngOnInit() {
    if (!this.authen.account) {
      this.router.navigateByUrl('/login');
    }
    if(this.authen.account.role !== 'master') {
      this.router.navigateByUrl('')
    }

    try {
      let rs = await this.userService.checkToken(this.authen.token);
      if(!rs.success) {
        this.logout()
      }
    } catch (e) {
      if(e.code == 104) {
        this.authen.clear();
        this.logout()
      }
    }

    $(".ot-search-field").focus(function(){
      $("#main-menu").addClass("minify-menu");
    }).blur(function(){
      $("#main-menu").removeClass("minify-menu");
    });
  }

  logout() {
    this.authen.clear();
    this.router.navigateByUrl('/login');
  }

}
