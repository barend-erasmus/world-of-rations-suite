import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-rations-route',
  templateUrl: './rations-route.component.html',
  styleUrls: ['./rations-route.component.css']
})
export class RationsRouteComponent implements OnInit {

  public user: any = {};

  public dietGroups: any[] = [];

  constructor(private http: Http) { }

  public ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.loadRations();
  }

  private loadRations(): void {
    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());

    this.http.get(`${environment.api.uri}/dietgroup/list`, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.dietGroups = json;
      });
  }

}
