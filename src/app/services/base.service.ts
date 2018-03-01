import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import * as urlJoin from 'url-join';
import { tap } from 'rxjs/operators';

@Injectable()
export class BaseService {

  constructor(protected http: HttpClient) {

  }

  protected delete<T>(uri: string): Observable<T> {
    return this.http.delete<T>(urlJoin(environment.api.uri, uri), {
      headers: this.getHeaders(),
    }).pipe(tap((result: any) => {
      console.log(`GET: ${uri}`);
    }));
  }

  protected get<T>(uri: string): Observable<T> {
    return this.http.get<T>(urlJoin(environment.api.uri, uri), {
      headers: this.getHeaders(),
    }).pipe(tap((result: any) => {
      console.log(`GET: ${uri}`);
    }));
  }

  protected getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return headers;
  }

  protected post<T>(uri: string, data: any): Observable<T> {
    return this.http.post<T>(urlJoin(environment.api.uri, uri), data, {
      headers: this.getHeaders(),
    }).pipe(tap((result: any) => {
      console.log(`POST: ${uri}`);
    }));
  }

  protected put<T>(uri: string, data: any): Observable<T> {
    return this.http.put<T>(urlJoin(environment.api.uri, uri), data, {
      headers: this.getHeaders(),
    }).pipe(tap((result: any) => {
      console.log(`PUT: ${uri}`);
    }));
  }
}
