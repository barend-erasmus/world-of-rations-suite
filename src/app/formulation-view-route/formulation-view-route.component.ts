import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { LoaderService } from '../loader.service';
import { FormulationService } from '../services/formulation.service';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';

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
    private activatedRoute: ActivatedRoute,
    private formulationService: FormulationService,
    loaderService: LoaderService,
    subscriptionService: SubscriptionService,
    userService: UserService,
  ) {
    super(true, loaderService, subscriptionService, userService);
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params): void => {
      this.initialize().subscribe(() => {
        if (this.subscription.permissions.indexOf('view-formulation') > -1) {

          // TODO: Move to usage service
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
      });
  }

  private loadFormulationCompositionValues(formulationId: number): void {
    this.formulationService.composition(formulationId)
      .subscribe((json: any) => {
        this.formulationCompositionValues = json;
      });
  }

  private loadFormulationSupplement(formulationId: number): void {
    this.formulationService.supplement(formulationId)
      .subscribe((json: any) => {
        this.supplement = json;
      });
  }

}
