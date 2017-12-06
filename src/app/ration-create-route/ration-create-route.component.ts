import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-ration-create-route',
  templateUrl: './ration-create-route.component.html',
  styleUrls: ['./ration-create-route.component.css']
})
export class RationCreateRouteComponent implements OnInit {

  public user: any = {};

  public nutrients: any[] = [];

  public diet: any = {};

  public messages: string[] = [];

  constructor(private http: Http, private router: Router, private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.route.params.subscribe(params => {

      this.loadDietGroup(params['dietGroupId']);
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

    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());
    headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

    this.http.post(`${environment.api.uri}/diet/create`, this.diet, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.router.navigateByUrl(`/ration/groups/edit/${this.diet.group.id}`);
      });
  }

  private loadNutrients(): void {

    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());
    headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

    this.http.get(`${environment.api.uri}/nutrient/list`, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.nutrients = json;

        this.diet.values = [];

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
      });
  }

  private loadDietGroup(dietGroupId: number): void {

        const headers = new Headers();
        headers.append('x-application-id', environment.application.id.toString());
        headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

        this.http.get(`${environment.api.uri}/dietgroup/find?id=${dietGroupId}`, {
          headers,
        })
          .map((res: Response) => res.json()).subscribe((json) => {
            this.diet.group = json;

            const groupChart: string[] = [];

            let group: any = this.diet.group;

            while (group) {
              groupChart.push(group.name);

              group = group.parent;
            }

            groupChart.reverse();

            this.diet.groupChart = groupChart.join(' - ');

            this.loadNutrients();
          });
      }
}