import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-feedstuff-route',
  templateUrl: './feedstuff-route.component.html',
  styleUrls: ['./feedstuff-route.component.css']
})
export class FeedstuffRouteComponent implements OnInit {

  public user: any = {};

  public ingredients: any[] = [];

  constructor(private http: Http, private loaderService: LoaderService) {
    this.loaderService.reset();
   }

  public ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    if (this.user.permissions.indexOf('view-ingredient') > -1) {
      this.loadIngredients();
    }
  }

  private loadIngredients(): void {

    this.loaderService.startRequest();

    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());
    headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

    this.http.get(`${environment.api.uri}/ingredient/list`, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.ingredients = json;

        this.loaderService.endRequest();
      });
  }

}
