import {Component, OnInit} from '@angular/core';
import {UserService} from "./shared-services/api/user.service";
import {AuthenticateService} from "./shared-services/authenticate.service";
import {Router, NavigationStart} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userSevice: UserService, private authen: AuthenticateService, private router: Router) {
  }

  previouseUrl = "";
  async ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        console.log(this.previouseUrl, e.url);
        this.previouseUrl = e.url;
      }
    });
    console.log(this.authen.account);
    if (!this.authen.account) {
      this.redirectToLogin();
    }

    if(this.authen.account.role === 'student') {
      this.router.navigateByUrl('/student');
    }

    if(this.authen.account.role === 'master') {
      this.router.navigateByUrl('/master');
    }

    if(this.authen.account.role === 'admin') {
      this.router.navigateByUrl('admin');
    }


  }

  signOut() {
    this.authen.clear();
    this.redirectToLogin();
  }
  private redirectToLogin() {
    let link = "/login";
    this.router.navigateByUrl(link);
  }
}
