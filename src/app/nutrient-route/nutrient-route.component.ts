import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-nutrient-route',
  templateUrl: './nutrient-route.component.html',
  styleUrls: ['./nutrient-route.component.css']
})
export class NutrientRouteComponent extends BaseComponent implements OnInit {

  public nutrients: any[] = [];

  constructor(http: Http, loaderService: LoaderService) {
    super(http, loaderService, true);
  }

  public ngOnInit(): void {
    this.initialize().then(() => {
      if (this.subscription.permissions.indexOf('view-nutrient') > -1) {
        this.loadNutrients();
      }
    });
  }

  private loadNutrients(): void {
    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/nutrient/list`, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.nutrients = json;

        this.loaderService.endRequest();
      });
  }
}
