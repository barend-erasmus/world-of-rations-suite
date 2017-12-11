import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-ration-group-route',
  templateUrl: './ration-group-route.component.html',
  styleUrls: ['./ration-group-route.component.css']
})
export class RationGroupRouteComponent implements OnInit {

  public user: any = {};

  public dietGroups: any[] = [];

  constructor(private http: Http, private loaderService: LoaderService) {
    this.loaderService.reset();
  }

  public ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.permissions.indexOf('view-diet-group') > -1) {
      this.loadDietGroups();
    }
  }

  private loadDietGroups(): void {

    this.loaderService.startRequest();

    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());
    headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

    this.http.get(`${environment.api.uri}/dietgroup/list`, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        if (this.user.permissions.indexOf('super-user') > -1) {
          this.dietGroups = json;
        } else {
          this.dietGroups = json.filter((x) => x.name === 'User Defined');
        }

        this.loaderService.endRequest();
      });
  }

}
