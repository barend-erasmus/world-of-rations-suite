import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { LoaderService } from '../loader.service';
import { DietGroup } from '../models/diet-group';
import { Ingredient } from '../models/ingredient';
import { SuggestedValue } from '../models/suggested-value';
import { DietGroupService } from '../services/diet-group.service';
import { IngredientService } from '../services/ingredient.service';
import { SubscriptionService } from '../services/subscription.service';
import { SuggestedValueService } from '../services/suggested-value.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-suggested-value-create-route',
  templateUrl: './suggested-value-create-route.component.html',
  styleUrls: ['./suggested-value-create-route.component.css']
})
export class SuggestedValueCreateRouteComponent extends BaseComponent implements OnInit {

  public dietGroupDropdowns: any[] = [];

  public ingredients: any[] = [];

  public messages: string[] = [];

  public suggestedValue: SuggestedValue = new SuggestedValue(
    null,
    null,
    new DietGroup(null, null, null, null),
    new Ingredient(null, null, null, null, null, null),
    null,
    null,
  );

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
    this.suggestedValueService.create(this.suggestedValue)
      .subscribe((json: any) => {
        this.router.navigateByUrl('/suggestedvalue');
      });
  }

  private loadDietGroupDropdown(dietGroupParentId: number, selectedIds: number[] = []): void {
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
      });
  }

  private loadIngredients(): void {
    this.ingredientService.list()
      .subscribe((json: any) => {
        this.ingredients = json;
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
