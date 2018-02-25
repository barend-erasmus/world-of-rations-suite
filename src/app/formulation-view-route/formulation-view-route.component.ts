import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';
import { UserService } from '../services/user.service';
import { SubscriptionService } from '../services/subscription.service';
import { FormulationService } from '../services/formulation.service';
declare let gtag: Function;

@Component({
  selector: 'app-formulation-view-route',
  templateUrl: './formulation-view-route.component.html',
  styleUrls: ['./formulation-view-route.component.css']
})
export class FormulationViewRouteComponent extends BaseComponent implements OnInit {

  public formulation: any = {};
  public formulationCompositionValues: any[] = [];
  public supplement: any = [];

  constructor(
    private formulationService: FormulationService,
    loaderService: LoaderService,
    private route: ActivatedRoute,
    subscriptionService: SubscriptionService,
    userService: UserService,
  ) {
    super(true, loaderService, subscriptionService, userService);
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.initialize().subscribe(() => {
        if (this.subscription.permissions.indexOf('view-formulation') > -1) {

          gtag('event', 'view_formulation', {
            'event_category': 'formulator',
            'formulationId': params['formulationId'],
          });

          this.loadFormulation(params['formulationId']);
        }
      });
    });
  }

  private loadFormulation(formulationId: number): void {
    this.loaderService.startRequest();

    this.formulationService.find(formulationId)
      .subscribe((json: any) => {
        this.formulation = json;

        const groupChart: string[] = [];

        let group: any = this.formulation.diet.group;

        while (group) {
          groupChart.push(group.name);

          group = group.parent;
        }

        groupChart.reverse();

        this.formulation.diet.groupChart = groupChart.join(' - ');

        if (this.subscription.permissions.indexOf('view-formulation-composition') > -1) {
          this.loadFormulationCompositionValues(formulationId);
        }

        if (this.subscription.permissions.indexOf('view-formulation-supplement') > -1) {
          this.loadFormulationSupplement(formulationId);
        }

        this.loaderService.endRequest();
      });
  }

  private loadFormulationCompositionValues(formulationId: number): void {
    this.loaderService.startRequest();

    this.formulationService.composition(this.formulation)
      .subscribe((json: any) => {
        this.formulationCompositionValues = json;

        this.loaderService.endRequest();
      });
  }

  private loadFormulationSupplement(formulationId: number): void {
    this.loaderService.startRequest();

    this.formulationService.supplement(this.formulation)
      .subscribe((json: any) => {
        this.supplement = json;

        this.loaderService.endRequest();
      }, (error) => {
        this.loaderService.endRequest();
      });
  }
}
