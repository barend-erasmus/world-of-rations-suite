import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-home-route',
  templateUrl: './home-route.component.html',
  styleUrls: ['./home-route.component.css']
})
export class HomeRouteComponent extends BaseComponent implements OnInit {

  public formulations: any[] = [];

  constructor(http: Http, loaderService: LoaderService) {
    super(http, loaderService);
  }

  public ngOnInit(): void {
    this.initialize().then(() => {
      if (this.subscription.permissions.indexOf('view-formulation') > -1) {
        this.loadFormulations();
      }
    });
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
