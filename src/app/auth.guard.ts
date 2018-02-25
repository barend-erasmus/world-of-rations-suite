import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {

  private user: any;

  constructor(private http: HttpClient) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return new Observable<boolean>(observer => {
      const accessToken = localStorage.getItem('token');

      if (accessToken) {
        this.http.get(`${environment.api.uri}/user/info`, {
          headers: this.getHeaders(accessToken),
        }).subscribe((json: any) => {
            this.user = json;
            localStorage.setItem('user', JSON.stringify(this.user));

            observer.next(true);
            observer.complete();
          }, (err) => {
            this.redirectToAuth0();

            observer.next(false);
            observer.complete();
          });
      } else {
        this.redirectToAuth0();

        observer.next(false);
        observer.complete();
      }
    });
  }

  private getHeaders(accessToken: string): HttpHeaders {
    return new HttpHeaders({
      'authorization': `Bearer ${accessToken}`,
    });
  }

  private redirectToAuth0(): void {
    window.location.href =
          `https://worldofrations.auth0.com/authorize?` +
          `scope=openid%20email%20profile&` +
          `response_type=token&` +
          `client_id=qVN7NLKDr9ap_tFr3Ri9CZlQrnkcdEwf&` +
          `redirect_uri=${environment.application.uri}/login`;
  }
}
