import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { LoaderService } from '../loader.service';
import { DietGroupService } from '../services/diet-group.service';
import { DietService } from '../services/diet.service';
import { FormulatorService } from '../services/formulator.service';
import { IngredientService } from '../services/ingredient.service';
import { SubscriptionService } from '../services/subscription.service';
import { SuggestedValueService } from '../services/suggested-value.service';
import { UserService } from '../services/user.service';

declare let gtag: Function;

@Component({
  selector: 'app-formulator-route',
  templateUrl: './formulator-route.component.html',
  styleUrls: ['./formulator-route.component.css']
})
export class FormulatorRouteComponent extends BaseComponent implements OnInit {

  public dietGroupDropdowns: any[] = [];

  public diets: any[] = [];

  public formulationIngredients: any[] = [];

  public ingredients: any[] = [];

  public messages: string[] = [];

  public mixWeight = 1000;

  public result: any = null;

  public selectedDiet: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dietService: DietService,
    private dietGroupService: DietGroupService,
    private formulatorService: FormulatorService,
    private ingredientService: IngredientService,
    loaderService: LoaderService,
    subscriptionService: SubscriptionService,
    private suggestedValueService: SuggestedValueService,
    userService: UserService,
  ) {
    super(true, loaderService, subscriptionService, userService);
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params): void => {
      this.initialize().subscribe(() => {
        if (params['formulationId']) {
          this.loadDietGroupDropdown(null, [69, 216, 217, 859]);
        } else {
          this.loadDietGroupDropdown(null);
          this.loadIngredients();
        }
      });
    });
  }

  public onChange_DietGroupDropdown(index: number): void {
    if (index + 1 !== this.dietGroupDropdowns.length) {
      this.dietGroupDropdowns = this.dietGroupDropdowns.slice(0, index + 1);

      this.selectedDiet = null;
      this.diets = [];
    }

    this.loadDietGroupDropdown(this.dietGroupDropdowns[index].selectedItem.id);
  }

  public onClick_Formulate(): void {
    // TODO: Move to usage service
    gtag('event', 'formulate', {
      'event_category': 'formulator',
      'dietId': this.selectedDiet ? this.selectedDiet.id : -1,
    });

    this.messages = [];

    if (!this.selectedDiet) {
      this.messages.push('Select a ration');
    }

    if (this.messages.length > 0) {
      return;
    }

    this.formulatorService.create({
      diet: this.selectedDiet,
      formulationIngredients: this.formulationIngredients,
      mixWeight: this.mixWeight,
    })
      .subscribe((json: any) => {
        this.result = json;
      });
  }

  public onClick_AddIngredient(): void {
    // TODO: Move to usage service
    gtag('event', 'add_ingredient', {
      'event_category': 'formulator',
      'dietId': this.selectedDiet ? this.selectedDiet.id : -1,
    });

    this.formulationIngredients.push({
      ingredient: null,
      cost: null,
      minimum: 0,
      maximum: this.mixWeight,
      weight: null,
    });
  }

  public onClick_RemoveIngredient(item: any): void {
    gtag('event', 'remove_ingredient', {
      'event_category': 'formulator',
      'dietId': this.selectedDiet ? this.selectedDiet.id : -1,
    });

    this.formulationIngredients.splice(this.formulationIngredients.indexOf(item), 1);
  }

  public getKeys(obj: any): any[] {
    return Object.keys(obj).map((key) => ({ key: key, value: obj[key] }));
  }

  public onChange_Ingredient(formulationIngredient: any): void {
    if (this.subscription.permissions.indexOf('view-suggested-value') === -1) {
      return;
    }

    if (!this.selectedDiet) {
      return;
    }

    this.loadSuggestedValue(formulationIngredient);
  }

  public onChange_Diet(): void {
    if (this.subscription.permissions.indexOf('view-suggested-value') === -1) {
      return;
    }

    if (!this.selectedDiet) {
      return;
    }

    for (const formulationIngredient of this.formulationIngredients) {
      this.loadSuggestedValue(formulationIngredient);
    }
  }

  private onDietGroupSelected(selectedId: number = null): void {
    this.dietService.list(this.dietGroupDropdowns[this.dietGroupDropdowns.length - 1].selectedItem.id)
      .subscribe((json: any) => {
        this.diets = json;

        if (selectedId) {
          this.selectedDiet = json.find((x) => x.id === selectedId);
        }
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
        } else {
          this.onDietGroupSelected(selectedIds[0]);
        }
      });
  }

  private loadSuggestedValue(formulationIngredient: any): void {
    this.suggestedValueService.find(this.selectedDiet.id, formulationIngredient.ingredient.id)
      .subscribe((json: any) => {

        formulationIngredient.suggestedValue = json;
      });
  }

  private loadIngredients(): void {
    this.ingredientService.list()
      .subscribe((json: any) => {
        this.ingredients = json;

        // TODO: Move to configuration
        this.formulationIngredients = [
          {
            ingredient: this.ingredients.find((x) => x.name === 'Alfalfa Hay, Dehydrated, 17% Crude Protein'),
            cost: 2300,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Sunflower Seed Hulls'),
            cost: 800,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Corn Grain (Maize), Yellow'),
            cost: 3800,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Oats, Grain'),
            cost: 3000,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Molasses, Sugarcane (Syrup)'),
            cost: 4500,
            minimum: 0,
            maximum: this.mixWeight * 0.08,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Fish Meal, Herring'),
            cost: 6000,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Cottonseed O/C Meal, Mech Extr.'),
            cost: 7000,
            minimum: 0,
            maximum: this.mixWeight * 0.120,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Urea, 46% Nitrogen'),
            cost: 6000,
            minimum: 0,
            maximum: this.mixWeight * 0.004,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Canola (Rapeseed) Oil'),
            cost: 7500,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Ca, As Ground Limestone'),
            cost: 1200,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Na And Cl, As Salt'),
            cost: 900,
            minimum: this.mixWeight * 0.004,
            maximum: this.mixWeight * 0.004,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'K, As Potassium Chloride (KCl)'),
            cost: 2000,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Mg, As Magnesium Oxide (MgO)'),
            cost: 2500,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Ca And P, As Di-Calcium Phosphate'),
            cost: 2500,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Sulphur, As Ammonium Sulphate ((NH4)2SO4)'),
            cost: 5000,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
        ];
      });
  }

}
