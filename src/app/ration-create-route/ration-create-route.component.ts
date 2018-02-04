import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-ration-create-route',
  templateUrl: './ration-create-route.component.html',
  styleUrls: ['./ration-create-route.component.css']
})
export class RationCreateRouteComponent extends BaseComponent implements OnInit {

  public nutrients: any[] = [];

  public diet: any = {};

  public messages: string[] = [];

  constructor(http: Http, private router: Router, private route: ActivatedRoute, loaderService: LoaderService) {
    super(http, loaderService);
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.initialize().then(() => {
        this.loadDietGroup(params['dietGroupId']);
      });
    });
  }

  public onClick_Save(): void {

    this.messages = [];

    if (!this.diet.name) {
      this.messages.push('Name cannot be empty');
    }

    if (this.messages.length > 0) {
      return;
    }

    this.loaderService.startRequest();

    this.http.post(`${environment.api.uri}/diet/create`, this.diet, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.router.navigateByUrl(`/ration/groups/edit/${this.diet.group.id}`);

        this.loaderService.endRequest();
      });
  }

  private loadNutrients(): void {

    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/nutrient/list`, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.nutrients = json;

        this.diet.values = [];

        for (const nutrient of this.nutrients) {
          if (!this.diet.values.find((x) => x.nutrient.id === nutrient.id)) {
            this.diet.values.push({
              id: null,
              maximum: null,
              minimum: null,
              nutrient,
            });
          }
        }

        this.diet.values = this.diet.values.sort((a, b) => a.nutrient.sortOrder - b.nutrient.sortOrder);

        this.loaderService.endRequest();
      });
  }

  private loadDietGroup(dietGroupId: number): void {

    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/dietgroup/find?id=${dietGroupId}`, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.diet.group = json;

        const groupChart: string[] = [];

        let group: any = this.diet.group;

        while (group) {
          groupChart.push(group.name);

          group = group.parent;
        }

        groupChart.reverse();

        this.diet.groupChart = groupChart.join(' - ');

        this.loadNutrients();

        this.loaderService.endRequest();
      });
  }
}
