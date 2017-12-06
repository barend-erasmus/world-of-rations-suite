import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-formulator-route',
  templateUrl: './formulator-route.component.html',
  styleUrls: ['./formulator-route.component.css']
})
export class FormulatorRouteComponent implements OnInit {

  public user: any = {};

  public ingredients: any[] = [];

  public dietGroupDropdowns: any[] = [];

  public selectedDiet: any = null;

  public diets: any[] = [];

  public formulationIngredients: any[] = [];

  public mixWeight = 1000;

  constructor(private http: Http) { }

  public ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.loadDietGroupDropdown(null);

    this.loadIngredients();
  }

  public onChange_DietGroupDropdown(index: number): void {
    if (index + 1 !== this.dietGroupDropdowns.length) {
      this.dietGroupDropdowns = this.dietGroupDropdowns.slice(0, index + 1);
    }

    this.loadDietGroupDropdown(this.dietGroupDropdowns[index].selectedItem.id);
  }

  public onClick_Formulate(): void {
    console.log(this.selectedDiet);
    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());
    headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

    this.http.post(`${environment.api.uri}/formulator/create`, {
      diet: this.selectedDiet,
      formulationIngredients: this.formulationIngredients,
      mixWeight: this.mixWeight,
    }, {
        headers,
      })
      .map((res: Response) => res.json()).subscribe((json) => {
        console.log(json);
      });
  }

  private onDietGroupSelected(): void {

    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());
    headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

    this.http.get(`${environment.api.uri}/diet/list` +
      `?dietGroupId=${this.dietGroupDropdowns[this.dietGroupDropdowns.length - 1].selectedItem.id}`, {
        headers,
      })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.diets = json;
        this.selectedDiet = this.diets[0];
      });
  }

  private loadDietGroupDropdown(dietGroupParentId: number): void {
    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());
    headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

    this.http.get(`${environment.api.uri}/dietgroup/list${dietGroupParentId ? `?dietGroupId=${dietGroupParentId}` : ''}`, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        if (json.length > 0) {
          this.dietGroupDropdowns.push({
            dietGroups: json,
            selectedItem: null,
          });
        } else {
          this.onDietGroupSelected();
        }
      });
  }

  private loadIngredients(): void {
    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());
    headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

    this.http.get(`${environment.api.uri}/ingredient/list`, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.ingredients = json;

        this.formulationIngredients = [
          {
            ingredient: this.ingredients.find((x) => x.name === 'Alfalfa hay, dehy 17% CP'),
            cost: 2300,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Sunflower seed hulls'),
            cost: 800,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Corn grain (maize), yellow'),
            cost: 3800,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Oats, grain'),
            cost: 3000,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Molasses, sugarcane (syrup)'),
            cost: 4500,
            minimum: 0,
            maximum: this.mixWeight * 0.08,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Fish meal, herring'),
            cost: 6000,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Cottonseed o/c meal, mech extr'),
            cost: 7000,
            minimum: 0,
            maximum: this.mixWeight * 0.120,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Urea 46% Nitrogen'),
            cost: 6000,
            minimum: 0,
            maximum: this.mixWeight * 0.004,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Canola (Rapeseed) oil'),
            cost: 7500,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Ca, as ground Limestone'),
            cost: 1200,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Na and Cl, as Salt'),
            cost: 900,
            minimum: this.mixWeight * 0.004,
            maximum: this.mixWeight * 0.004,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'K, as Potassium Chloride (KCl)'),
            cost: 2000,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Mg, as Magnesium oxide (MgO)'),
            cost: 2500,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'Ca and P, as Di-calcium phosphate'),
            cost: 2500,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
          {
            ingredient: this.ingredients.find((x) => x.name === 'S, as Ammonium Sulphate ((NH4)2SO4)'),
            cost: 5000,
            minimum: 0,
            maximum: this.mixWeight,
            weight: null,
          },
        ];
      });
  }

}
