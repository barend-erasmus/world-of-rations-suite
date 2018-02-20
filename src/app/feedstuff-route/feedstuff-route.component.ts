import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-feedstuff-route',
  templateUrl: './feedstuff-route.component.html',
  styleUrls: ['./feedstuff-route.component.css']
})
export class FeedstuffRouteComponent extends BaseComponent implements OnInit {

  public ingredients: any[] = [];

  constructor(http: Http, loaderService: LoaderService) {
    super(http, loaderService, true);
  }

  public ngOnInit(): void {
    this.initialize().then(() => {
      if (this.subscription.permissions.indexOf('view-ingredient') > -1) {
        this.loadIngredients();
      }
    });
  }

  private loadIngredients(): void {
    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/ingredient/list`, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.ingredients = json;

        this.loaderService.endRequest();
      });
  }

}
