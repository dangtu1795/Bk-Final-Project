import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {UtilService} from "./shared-services/util.service";
import {LocalStorageService} from "./shared-services/localstorage.service";
import {HttpService} from "./shared-services/http.service";
import {UserService} from "./shared-services/api/user.service";
import {HttpClientModule} from "@angular/common/http";
import {AuthenticateService} from "./shared-services/authenticate.service";
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {RouterModule} from "@angular/router";
import {StudentModule} from "./student/student.module";
import {MasterModule} from "./master/master.module";
import {YoutubePlayerModule} from "ngx-youtube-player";
import {SocketService} from "./shared-services/socket.service";
import { NotFoundComponent } from './components/not-found/not-found.component';
import {CourseService} from "./shared-services/api/course.service";
import {NotificationService} from "./shared-services/notification.service";
import {ToastyModule} from "ng2-toasty"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AdminModule} from "./admin/admin.module";
const appRoutes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'registration', component: RegistrationComponent
  },
  {
    path: "**", component: NotFoundComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    YoutubePlayerModule,
    StudentModule,
    MasterModule,
    AdminModule,
    ToastyModule.forRoot(),
  ],
  providers: [UtilService, LocalStorageService, HttpService, UserService, AuthenticateService, SocketService, CourseService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
