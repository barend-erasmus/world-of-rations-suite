import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-home-route',
  templateUrl: './home-route.component.html',
  styleUrls: ['./home-route.component.css']
})
export class HomeRouteComponent implements OnInit {

  public user: any = {};

  public formulations: any[] = [];

  constructor(private http: Http, private loaderService: LoaderService) {
    this.loaderService.reset();
  }

  public ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    if (this.user.subscription.permissions.indexOf('view-formulation') > -1) {
      this.loadFormulations();
    }
  }

  private loadFormulations(): void {

    this.loaderService.startRequest();

    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());
    headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

    this.http.get(`${environment.api.uri}/formulation/list`, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.formulations = json;

        this.loaderService.endRequest();
      });
  }
}
