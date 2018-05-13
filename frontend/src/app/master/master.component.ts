import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticateService} from "../shared-services/authenticate.service";

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  constructor(private router: Router, private authen: AuthenticateService) { }

  ngOnInit() {
    if(this.authen.account.role !== 'master') {
      this.router.navigateByUrl('/student')
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
