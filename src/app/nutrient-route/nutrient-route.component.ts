import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-nutrient-route',
  templateUrl: './nutrient-route.component.html',
  styleUrls: ['./nutrient-route.component.css']
})
export class NutrientRouteComponent implements OnInit {

  public user: any = {};

  public nutrients: any[] = [];

  constructor(private http: Http, private loaderService: LoaderService) { 
    this.loaderService.reset();
  }

  public ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    if (this.user.permissions.indexOf('view-nutrient') > -1) {
      this.loadNutrients();
    }
  }

  private loadNutrients(): void {

    this.loaderService.startRequest();

    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());
    headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

    this.http.get(`${environment.api.uri}/nutrient/list`, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.nutrients = json;

        this.loaderService.endRequest();
      });
  }
}
