import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';
import { FormulationService } from '../services/formulation.service';

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

    this.formulationService.list()
      .subscribe((json: any) => {
        this.formulations = json;

        this.loaderService.endRequest();
      });
  }
}
