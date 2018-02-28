import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';
import { DietGroupService } from '../services/diet-group.service';
import { SuggestedValueService } from '../services/suggested-value.service';
import { IngredientService } from '../services/ingredient.service';
import { SuggestedValue } from '../models/suggested-value';
import { DietGroup } from '../models/diet-group';
import { Ingredient } from '../models/ingredient';

@Component({
  selector: 'app-suggested-value-create-route',
  templateUrl: './suggested-value-create-route.component.html',
  styleUrls: ['./suggested-value-create-route.component.css']
})
export class SuggestedValueCreateRouteComponent extends BaseComponent implements OnInit {

  public suggestedValue: SuggestedValue = new SuggestedValue(
    null,
    null,
    new DietGroup(null, null, null, null),
    new Ingredient(null, null, null, null, null, null),
    null,
    null,
  );

  public messages: string[] = [];

  public dietGroupDropdowns: any[] = [];

  public ingredients: any[] = [];

  constructor(
    private dietGroupService: DietGroupService,
    private ingredientService: IngredientService,
    loaderService: LoaderService,
    private router: Router,
    subscriptionService: SubscriptionService,
    private suggestedValueService: SuggestedValueService,
    userService: UserService,
  ) {
    super(true, loaderService, subscriptionService, userService);
  }

  public ngOnInit(): void {
    this.initialize().subscribe(() => {
      if (this.subscription.permissions.indexOf('create-suggested-value') > -1) {
        this.loadDietGroupDropdown(null);
        this.loadIngredients();
      }
    });
  }

  public onChange_DietGroupDropdown(index: number): void {
    if (index + 1 !== this.dietGroupDropdowns.length) {
      this.dietGroupDropdowns = this.dietGroupDropdowns.slice(0, index + 1);
    }

    this.suggestedValue.dietGroup = this.dietGroupDropdowns[index].selectedItem;

    this.loadDietGroupDropdown(this.dietGroupDropdowns[index].selectedItem.id);
  }

  public onClick_Save(): void {
    this.loaderService.startRequest();

    this.suggestedValueService.create(this.suggestedValue)
      .subscribe((json: any) => {
        this.router.navigateByUrl('/suggestedvalue');

        this.loaderService.endRequest();
      });
  }

  private loadDietGroupDropdown(dietGroupParentId: number, selectedIds: number[] = []): void {
    this.loaderService.startRequest();

    this.dietGroupService.list(dietGroupParentId)
      .subscribe((json: any) => {
        if (json.length > 0) {
          if (selectedIds.length > 0) {

            const selectedItem = selectedIds[0];

            this.dietGroupDropdowns.push({
              dietGroups: json,
              selectedItem: json.find((x) => x.id === selectedItem),
            });

            selectedIds.splice(0, 1);

            this.loadDietGroupDropdown(selectedItem, selectedIds);

          } else {
            this.dietGroupDropdowns.push({
              dietGroups: json,
              selectedItem: null,
            });
          }
        }

        this.loaderService.endRequest();
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

  private getDietGroupIds(): number[] {
    const ids: number[] = [];

    let dietGroup: any = this.suggestedValue.dietGroup;

    while (dietGroup) {
      ids.push(dietGroup.id);

      dietGroup = dietGroup.parent;
    }

    ids.reverse();

    return ids;
  }

}
