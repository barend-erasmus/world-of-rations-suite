import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-formulator-view-route',
  templateUrl: './formulator-view-route.component.html',
  styleUrls: ['./formulator-view-route.component.css']
})
export class FormulatorViewRouteComponent implements OnInit {

  public user: any = {};

  public formulation: any = {};
  public formulationCompositionValues: any[] = [];

  constructor(private http: Http, private router: Router, private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.route.params.subscribe(params => {
      this.loadFormulation(params['formulationId']);
    });
  }

  private loadFormulation(formulationId: number): void {

    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());
    headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

    this.http.get(`${environment.api.uri}/formulator/find?id=${formulationId}`, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.formulation = json;


        const groupChart: string[] = [];

        let group: any = this.formulation.diet.group;

        while (group) {
          groupChart.push(group.name);

          group = group.parent;
        }

        groupChart.reverse();

        this.formulation.diet.groupChart = groupChart.join(' - ');

        this.loadFormulationCompositionValues(formulationId);
      });
  }

  private loadFormulationCompositionValues(formulationId: number): void {
    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());
    headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

    this.http.get(`${environment.api.uri}/formulator/composition?id=${formulationId}`, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.formulationCompositionValues = json;
      });
  }

}
