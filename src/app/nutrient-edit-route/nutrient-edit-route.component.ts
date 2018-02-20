import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-nutrient-edit-route',
  templateUrl: './nutrient-edit-route.component.html',
  styleUrls: ['./nutrient-edit-route.component.css']
})
export class NutrientEditRouteComponent extends BaseComponent implements OnInit {

  public nutrient: any = {};

  public messages: string[] = [];

  constructor(http: Http, private router: Router, private route: ActivatedRoute, loaderService: LoaderService) {
    super(http, loaderService, true);
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.initialize().then(() => {
        if (this.subscription.permissions.indexOf('view-nutrient') > -1) {
          this.loadNutrient(params['nutrientId']);
        }
      });
    });
  }

  public onClick_Save(): void {

    this.messages = [];

    if (!this.nutrient.abbreviation) {
      this.messages.push('Abbreviation cannot be empty');
    }

    if (!this.nutrient.code) {
      this.messages.push('Code cannot be empty');
    }

    if (!this.nutrient.name) {
      this.messages.push('Name cannot be empty');
    }

    if (!this.nutrient.unit) {
      this.messages.push('Unit cannot be empty');
    }

    if (!this.nutrient.sortOrder) {
      this.messages.push('Sort Order cannot be empty');
    }

    if (this.messages.length > 0) {
      return;
    }

    this.loaderService.startRequest();

    this.http.post(`${environment.api.uri}/nutrient/update`, this.nutrient, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.router.navigateByUrl('/nutrients');

        this.loaderService.endRequest();
      });
  }

  private loadNutrient(nutrientId: number): void {

    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/nutrient/find?nutrientId=${nutrientId}`, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.nutrient = json;

        this.loaderService.endRequest();
      });
  }

}
