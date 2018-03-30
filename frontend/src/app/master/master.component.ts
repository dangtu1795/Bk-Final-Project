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
  }

  logout() {
    this.authen.clear();
    this.router.navigateByUrl('/login');
  }

}
