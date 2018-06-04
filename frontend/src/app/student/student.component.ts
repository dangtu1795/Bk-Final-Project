import {Component,} from '@angular/core';
import {UserService} from "../shared-services/api/user.service";
import {AuthenticateService} from "../shared-services/authenticate.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {


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

    if(this.authen.account.role !== 'student') {
      this.router.navigateByUrl('');
    }
  }

  private redirectToLogin() {
    let link = "/login";
    this.router.navigateByUrl(link);
  }

}
