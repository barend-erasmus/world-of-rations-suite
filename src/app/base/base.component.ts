import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/forkJoin';
import { LoaderService } from '../loader.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent {

  public subscription: any = null;
  public user: any = null;

  constructor(protected http: Http, protected loaderService: LoaderService) {
    this.loaderService.reset();
  }

  protected getHeaders(): Headers {
    const headers = new Headers();
    headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

    return headers;
  }

  protected initialize(): Promise<any> {
    this.loaderService.startRequest();

    return Promise.all([
      this.loadSubscription(),
      this.loadUser(),
    ]).then((results: any[]) => {
      this.subscription = results[0];
      this.user = results[1];

      this.loaderService.endRequest();

    });
  }

  private loadSubscription(): Promise<any> {
    return this.http.get(`${environment.api.uri}/subscription/find`, {
      headers: this.getHeaders(),
    }).map((res: Response) => res.json()).toPromise();
  }

  private loadUser(): Promise<any> {
    return this.http.get(`${environment.api.uri}/user/info`, {
      headers: this.getHeaders(),
    }).map((res: Response) => res.json()).toPromise();
  }

}
