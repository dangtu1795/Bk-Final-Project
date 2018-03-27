import {Injectable} from "@angular/core";
import {AuthenticateService} from "./authenticate.service";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpHeaders, HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators/catchError";


@Injectable()
export class HttpService {

  server = `${environment.server}/api/v1`;
  headers;
  formDataHeaders;

  constructor(private http: HttpClient, private authenServer: AuthenticateService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": this.authenServer.token
    });

    this.formDataHeaders = new HttpHeaders({
      "Authorization": this.authenServer.token
    })
  }

  get(link, query?): Observable<any> {
    return this.http.get(`${this.server}/${link}`, {headers: this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  post(link, data): Observable<any> {
    return this.http.post(`${this.server}/${link}`, data, {headers: this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  postForm(link, formData): Observable<any> {
    return this.http.post(`${this.server}/${link}`, formData, {headers: this.formDataHeaders}).pipe(
      catchError(this.handleError)
    );
  }

  put(link, data): Observable<any> {
    return this.http.put(`${this.server}/${link}`, data, {headers: this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  putForm(link, formData): Observable<any> {
    return this.http.put(`${this.server}/${link}`, formData, {headers: this.formDataHeaders}).pipe(
      catchError(this.handleError)
    );
  }

  delete(link): Observable<any> {
    return this.http.delete(`${this.server}/link`, {headers: this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err) {
    if (!environment.production) {
      console.log("handleError", err);
    }
    let errMsg = {
      message: err.status == 0 ? "Connection is corrupted" : err.statusText,
      code: err.status,
      data: err
    };
    return Observable.throw(errMsg);
  }
}
