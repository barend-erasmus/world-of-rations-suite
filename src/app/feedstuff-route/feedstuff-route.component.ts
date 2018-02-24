import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';
import { UserService } from '../services/user.service';
import { SubscriptionService } from '../services/subscription.service';
import { IngredientService } from '../services/ingredient.service';

@Component({
  selector: 'app-feedstuff-route',
  templateUrl: './feedstuff-route.component.html',
  styleUrls: ['./feedstuff-route.component.css']
})
export class FeedstuffRouteComponent extends BaseComponent implements OnInit {

  public ingredients: any[] = [];

  constructor(
    private ingredientService: IngredientService,
    loaderService: LoaderService,
    subscriptionService: SubscriptionService,
    userService: UserService,
  ) {
    super(subscriptionService, userService, loaderService, true);
  }

  public ngOnInit(): void {
    this.initialize().subscribe(() => {
      if (this.subscription.permissions.indexOf('view-ingredient') > -1) {
        this.loadIngredients();
      }
    });
  }

  private loadIngredients(): void {
    this.loaderService.startRequest();

    this.ingredientService.list()
      .subscribe((json: any) => {
        this.ingredients = json;

        this.loaderService.endRequest();
      });
  }

}
