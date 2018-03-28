import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import * as urlJoin from 'url-join';

import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';

@Injectable()
export class BaseService {

  constructor(protected http: HttpClient, protected loaderService: LoaderService) {

  }

  protected delete<T>(uri: string): Observable<T> {
    this.loaderService.startRequest();

    return this.http.delete<T>(urlJoin(environment.api.uri, uri), {
      headers: this.getHeaders(),
    }).pipe(tap((result: any) => {
      console.log(`GET: ${uri}`);

      this.loaderService.endRequest();
    }))
      .catch((error: any) => Observable.throw(this.httpErrorHandler(error)));
  }

  protected get<T>(uri: string): Observable<T> {
    this.loaderService.startRequest();

    return this.http.get<T>(urlJoin(environment.api.uri, uri), {
      headers: this.getHeaders(),
    }).pipe(tap((result: any) => {
      console.log(`GET: ${uri}`);

      this.loaderService.endRequest();
    }))
      .catch((error: any) => Observable.throw(this.httpErrorHandler(error)));
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return headers;
  }

  protected post<T>(uri: string, data: any): Observable<T> {
    this.loaderService.startRequest();

    return this.http.post<T>(urlJoin(environment.api.uri, uri), data, {
      headers: this.getHeaders(),
    }).pipe(tap((result: any) => {
      console.log(`POST: ${uri}`);

      this.loaderService.endRequest();
    }))
      .catch((error: any) => Observable.throw(this.httpErrorHandler(error)));
  }

  protected put<T>(uri: string, data: any): Observable<T> {
    this.loaderService.startRequest();

    return this.http.put<T>(urlJoin(environment.api.uri, uri), data, {
      headers: this.getHeaders(),
    }).pipe(tap((result: any) => {
      console.log(`PUT: ${uri}`);

      this.loaderService.endRequest();
    }))
      .catch((error: any) => Observable.throw(this.httpErrorHandler(error)));
  }

  private httpErrorHandler(error: any): void {
    if (error.status === 429) {
      window.location.href = '/TooManyRequests';
    }

    if (error.status === 400) {
      // TODO: Validation Messages
    }

    this.loaderService.endRequest();
  }

}
