import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-feedstuff-route',
  templateUrl: './feedstuff-route.component.html',
  styleUrls: ['./feedstuff-route.component.css']
})
export class FeedstuffRouteComponent implements OnInit {

  public user: any = {};

  public ingredients: any[] = [];

  constructor(private http: Http) { }

  public ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.loadIngredients();
  }

  private loadIngredients(): void {
    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());

    this.http.get(`${environment.api.uri}/ingredient/list`, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.ingredients = json;
      });
  }

}
