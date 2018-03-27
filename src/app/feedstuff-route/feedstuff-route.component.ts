import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { BaseComponent } from '../base/base.component';
import { LoaderService } from '../loader.service';
import { IngredientService } from '../services/ingredient.service';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';

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
    super(true, loaderService, subscriptionService, userService);
  }

  public ngOnInit(): void {
    this.initialize().subscribe(() => {
      if (this.subscription.permissions.indexOf('view-ingredient') > -1) {
        this.loadIngredients();
      }
    }, this.httpErrorHandler);
  }

  private loadIngredients(): void {
    this.loaderService.startRequest();

    this.ingredientService.list()
      .subscribe((json: any) => {
        this.ingredients = json;

        this.loaderService.endRequest();
      }, this.httpErrorHandler);
  }

}
