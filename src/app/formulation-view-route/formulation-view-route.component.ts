import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
declare let gtag: Function;

@Component({
  selector: 'app-formulation-view-route',
  templateUrl: './formulation-view-route.component.html',
  styleUrls: ['./formulation-view-route.component.css']
})
export class FormulationViewRouteComponent implements OnInit {

  public user: any = {};

  public formulation: any = {};
  public formulationCompositionValues: any[] = [];
  public supplement: any = [];

  constructor(private http: Http, private router: Router, private route: ActivatedRoute, private loaderService: LoaderService) {
    this.loaderService.reset();
  }

  public ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.route.params.subscribe(params => {
      if (this.user.permissions.indexOf('view-formulation') > -1) {

        gtag('event', 'view_formulation', {
          'event_category': 'formulator',
          'formulationId': params['formulationId'],
        });

        this.loadFormulation(params['formulationId']);
      }
    });
  }

  private loadFormulation(formulationId: number): void {

    this.loaderService.startRequest();

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

        if (this.user.permissions.indexOf('view-formulation-composition') > -1) {
          this.loadFormulationCompositionValues(formulationId);
        }

        if (this.user.permissions.indexOf('view-formulation-supplement') > -1) {
          this.loadFormulationSupplement(formulationId);
        }

        this.loaderService.endRequest();
      });
  }

  private loadFormulationCompositionValues(formulationId: number): void {

    this.loaderService.startRequest();

    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());
    headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

    this.http.get(`${environment.api.uri}/formulator/composition?id=${formulationId}`, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.formulationCompositionValues = json;

        this.loaderService.endRequest();
      });
  }

  private loadFormulationSupplement(formulationId: number): void {

    this.loaderService.startRequest();

    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());
    headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

    this.http.get(`${environment.api.uri}/formulator/supplement?id=${formulationId}`, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.supplement = json;

        this.loaderService.endRequest();
      }, (error) => {
        this.loaderService.endRequest();
      });

  }
}
