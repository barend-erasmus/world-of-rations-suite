import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-formulation-route',
  templateUrl: './formulation-route.component.html',
  styleUrls: ['./formulation-route.component.css']
})
export class FormulationRouteComponent extends BaseComponent implements OnInit {

  public formulations: any[] = [];

  constructor(private http: HttpClient, subscriptionService: SubscriptionService, userService: UserService, loaderService: LoaderService) {
    super(subscriptionService, userService, loaderService, true);
  }

  public ngOnInit(): void {
    this.initialize().subscribe(() => {
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
      .subscribe((json: any) => {
        this.formulations = json;

        this.loaderService.endRequest();
      });
  }
}
