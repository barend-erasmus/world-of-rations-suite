import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { BaseComponent } from '../base/base.component';
import { LoaderService } from '../loader.service';
import { FormulationService } from '../services/formulation.service';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-formulation-route',
  templateUrl: './formulation-route.component.html',
  styleUrls: ['./formulation-route.component.css']
})
export class FormulationRouteComponent extends BaseComponent implements OnInit {

  public formulations: any[] = [];

  constructor(
    private formulationService: FormulationService,
    loaderService: LoaderService,
    subscriptionService: SubscriptionService,
    userService: UserService,
  ) {
    super(true, loaderService, subscriptionService, userService);
  }

  public ngOnInit(): void {
    this.initialize().subscribe(() => {
      if (this.subscription.permissions.indexOf('view-formulation') > -1) {
        this.loadFormulations();
      }
    }, this.httpErrorHandler);
  }

  private loadFormulations(): void {
    this.loaderService.startRequest();

    this.formulationService.list()
      .subscribe((json: any) => {
        this.formulations = json;

        this.loaderService.endRequest();
      }, this.httpErrorHandler);
  }
}
