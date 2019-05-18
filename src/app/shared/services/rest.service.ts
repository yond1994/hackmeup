import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {UtilsService} from "./utils.service";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  public headers: HttpHeaders;
  // empoint a peticion de api.
  public readonly url: string = 'http://10.70.201.146:1111';

  constructor(public http: HttpClient, public utils: UtilsService, private router: Router) {
    this.headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
  }

  get(endpoint: string, params?: IUrlParams): Promise<object> {
    return this.check(this.http.get(this.getUrl(endpoint, params), {headers: this.headers}).toPromise());
  }

  post(endpoint: string, body: object, params?: IUrlParams): Promise<object> {
    return this.check(this.http.post(this.getUrl(endpoint, params), body, {headers: this.headers}).toPromise());
  }

  put(endpoint: string, body: object, params?: IUrlParams): Promise<object> {
    return this.check(this.http.put(this.getUrl(endpoint, params), body, {headers: this.headers}).toPromise());
  }

  delete(endpoint: string, params?: IUrlParams): Promise<object> {
    return this.check(this.http.delete(this.getUrl(endpoint, params), {headers: this.headers}).toPromise());
  }

  public getUrl(endpoint: string, params?: IUrlParams): string {
    return this.url
      + '/api'
      + (endpoint || '/')
      + this.parseParams(params);
  }

  private parseParams(params: IUrlParams): string {
    let parsed: string = '';
    if (params)
      Object.keys(params).forEach((k, i) => {
        parsed += (i == 0) ? '?' : '&';
        parsed += k + '=' + params[k];
      });
    return parsed;
  }
  private check(requestPromise: Promise<object>): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      requestPromise.then(response => {
        resolve(response);
      }).catch(((err: HttpErrorResponse | any) => {
        switch (err.status) {
          case 401:
            // this.utils.openSnackBar(err.error.message, '');
            this.router.navigateByUrl('/home');
            break;
          default:
            // this.utils.openSnackBar(err.error.message, '');
            break;
        }
        // this.utils.openSnackBar(err.error.message, '');
        reject(err);
      }).bind(this));
    });
  }
}
interface IUrlParams {
  [key: string]: string | number | boolean;
}
