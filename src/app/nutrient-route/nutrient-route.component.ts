import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { BaseComponent } from '../base/base.component';
import { LoaderService } from '../loader.service';
import { NutrientService } from '../services/nutrient.service';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nutrient-route',
  templateUrl: './nutrient-route.component.html',
  styleUrls: ['./nutrient-route.component.css']
})
export class NutrientRouteComponent extends BaseComponent implements OnInit {

  public nutrients: any[] = [];

  constructor(
    loaderService: LoaderService,
    private nutrientService: NutrientService,
    subscriptionService: SubscriptionService,
    userService: UserService,
  ) {
    super(true, loaderService, subscriptionService, userService);
  }

  public ngOnInit(): void {
    this.initialize().subscribe(() => {
      if (this.subscription.permissions.indexOf('view-nutrient') > -1) {
        this.loadNutrients();
      }
    });
  }

  private loadNutrients(): void {
    this.loaderService.startRequest();

    this.nutrientService.list()
      .subscribe((json: any) => {
        this.nutrients = json;

        this.loaderService.endRequest();
      });
  }
}
