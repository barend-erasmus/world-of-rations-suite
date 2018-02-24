import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';
import { UserService } from '../services/user.service';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-ration-edit-route',
  templateUrl: './ration-edit-route.component.html',
  styleUrls: ['./ration-edit-route.component.css']
})
export class RationEditRouteComponent extends BaseComponent implements OnInit {

  public nutrients: any[] = [];

  public diet: any = {};

  public messages: string[] = [];

  constructor(private http: HttpClient, subscriptionService: SubscriptionService, userService: UserService, private router: Router, private route: ActivatedRoute, loaderService: LoaderService) {
    super(subscriptionService, userService, loaderService, true);
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.initialize().subscribe(() => {
        if (this.subscription.permissions.indexOf('view-diet') > -1) {
          this.loadDiet(params['dietId']);
        }
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

    this.http.post(`${environment.api.uri}/diet/update`, this.diet, {
      headers: this.getHeaders(),
    })
      .subscribe((json: any) => {
        this.router.navigateByUrl(`/ration/groups/edit/${this.diet.group.id}`);

        this.loaderService.endRequest();
      });
  }

  private loadNutrients(): void {
    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/nutrient/list`, {
      headers: this.getHeaders(),
    })
      .subscribe((json: any) => {
        this.nutrients = json;

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

  private loadDiet(dietId: number): void {
    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/diet/find?id=${dietId}`, {
      headers: this.getHeaders(),
    })
      .subscribe((json: any) => {
        this.diet = json;

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
