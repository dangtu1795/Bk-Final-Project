import {Component, OnInit} from '@angular/core';
import {UserService} from "./shared-services/api/user.service";
import {AuthenticateService} from "./shared-services/authenticate.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userSevice: UserService, private authen: AuthenticateService, private router: Router) {
  }

  async ngOnInit() {
    console.log(this.authen.account);
    if (!this.authen.account) {
      this.redirectToLogin();
    }

    try {
      let rs = await this.userSevice.checkToken(this.authen.token);
      if(!rs.success) {
        this.authen.clear();
        this.redirectToLogin();
      }
    } catch (e) {
      if(e.code == 104) {
        this.authen.clear();
        this.redirectToLogin();
      }
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
