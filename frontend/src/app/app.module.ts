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
    path: "**", component: RegistrationComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    YoutubePlayerModule,
    StudentModule,
    MasterModule
  ],
  providers: [UtilService, LocalStorageService, HttpService, UserService, AuthenticateService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
