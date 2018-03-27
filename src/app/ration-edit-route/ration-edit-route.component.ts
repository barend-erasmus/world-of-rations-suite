import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BaseComponent } from '../base/base.component';
import { LoaderService } from '../loader.service';
import { DietService } from '../services/diet.service';
import { NutrientService } from '../services/nutrient.service';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-ration-edit-route',
  templateUrl: './ration-edit-route.component.html',
  styleUrls: ['./ration-edit-route.component.css']
})
export class RationEditRouteComponent extends BaseComponent implements OnInit {

  public nutrients: any[] = [];

  public diet: any = {};

  public messages: string[] = [];

  constructor(
    private dietService: DietService,
    loaderService: LoaderService,
    private nutrientService: NutrientService,
    private route: ActivatedRoute,
    private router: Router,
    subscriptionService: SubscriptionService,
    userService: UserService,
  ) {
    super(true, loaderService, subscriptionService, userService);
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.initialize().subscribe(() => {
        if (this.subscription.permissions.indexOf('view-diet') > -1) {
          this.loadDiet(params['dietId']);
        }
      });
    }, this.httpErrorHandler);
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

    this.dietService.update(this.diet)
      .subscribe((json: any) => {
        this.router.navigateByUrl(`/ration/groups/edit/${this.diet.group.id}`);

        this.loaderService.endRequest();
      }, this.httpErrorHandler);
  }

  private loadNutrients(): void {
    this.loaderService.startRequest();

    this.nutrientService.list()
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
      }, this.httpErrorHandler);
  }

  private loadDiet(dietId: number): void {
    this.loaderService.startRequest();

    this.dietService.find(dietId)
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
      }, this.httpErrorHandler);
  }
}
