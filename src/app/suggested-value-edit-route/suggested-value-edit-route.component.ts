import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BaseComponent } from '../base/base.component';
import { LoaderService } from '../loader.service';
import { DietGroupService } from '../services/diet-group.service';
import { IngredientService } from '../services/ingredient.service';
import { SubscriptionService } from '../services/subscription.service';
import { SuggestedValueService } from '../services/suggested-value.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-suggested-value-edit-route',
  templateUrl: './suggested-value-edit-route.component.html',
  styleUrls: ['./suggested-value-edit-route.component.css']
})
export class SuggestedValueEditRouteComponent extends BaseComponent implements OnInit {

  public suggestedValue: any = null;

  public messages: string[] = [];

  public dietGroupDropdowns: any[] = [];

  public ingredients: any[] = [];

  constructor(
    private dietGroupService: DietGroupService,
    private ingredientService: IngredientService,
    loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router,
    subscriptionService: SubscriptionService,
    private suggestedValueService: SuggestedValueService,
    userService: UserService,
  ) {
    super(true, loaderService, subscriptionService, userService);
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.initialize().subscribe(() => {
        if (this.subscription.permissions.indexOf('view-suggested-value') > -1) {
          this.loadSuggestedValue(params['suggestedValueId']);
          this.loadIngredients();
        }
      });
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

    this.suggestedValueService.update(this.suggestedValue)
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

  private loadSuggestedValue(id: number): void {
    this.loaderService.startRequest();

    this.suggestedValueService.findById(id)
      .subscribe((json: any) => {
        this.suggestedValue = json;

        this.loadDietGroupDropdown(null, this.getDietGroupIds());

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
