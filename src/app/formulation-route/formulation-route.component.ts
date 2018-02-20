import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-formulation-route',
  templateUrl: './formulation-route.component.html',
  styleUrls: ['./formulation-route.component.css']
})
export class FormulationRouteComponent extends BaseComponent implements OnInit {

  public formulations: any[] = [];

  constructor(http: Http, loaderService: LoaderService) {
    super(http, loaderService, true);
  }

  public ngOnInit(): void {
    this.initialize().then(() => {
      if (this.subscription.permissions.indexOf('view-formulation') > -1) {
        this.loadFormulations();
      }
    });
  }

  private loadFormulations(): void {

    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/formulation/list`, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.formulations = json;

        this.loaderService.endRequest();
      });
  }
}
