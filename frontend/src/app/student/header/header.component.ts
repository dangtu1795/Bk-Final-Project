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

  ngOnInit() {
  }

  logout() {
    this.authen.clear();
    this.router.navigateByUrl('/login');
  }

}
