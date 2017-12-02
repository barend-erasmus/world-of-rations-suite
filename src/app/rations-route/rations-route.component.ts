import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-rations-route',
  templateUrl: './rations-route.component.html',
  styleUrls: ['./rations-route.component.css']
})
export class RationsRouteComponent implements OnInit {

  public user: any;

  public rations: any[] = [];

  constructor(private http: Http) { }

  public ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.loadRations();
  }

  private loadRations(): void {
    this.http.get(`${environment.api.uri}/dietgroup/list`)
      .map((res: Response) => res.json()).subscribe((json) => {
        this.rations = json;
        console.log(this.rations);
      });
  }

}
