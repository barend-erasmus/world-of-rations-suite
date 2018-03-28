import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { LoaderService } from '../loader.service';
import { NutrientService } from '../services/nutrient.service';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nutrient-edit-route',
  templateUrl: './nutrient-edit-route.component.html',
  styleUrls: ['./nutrient-edit-route.component.css']
})
export class NutrientEditRouteComponent extends BaseComponent implements OnInit {

  public messages: string[] = [];

  public nutrient: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    loaderService: LoaderService,
    private nutrientService: NutrientService,
    private router: Router,
    subscriptionService: SubscriptionService,
    userService: UserService,
  ) {
    super(true, loaderService, subscriptionService, userService);
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params): void => {
      this.initialize().subscribe(() => {
        if (this.subscription.permissions.indexOf('view-nutrient') > -1) {
          this.loadNutrient(params['nutrientId']);
        }
      });
    });
  }

  public onClick_Save(): void {
    this.messages = [];

    if (!this.nutrient.abbreviation) {
      this.messages.push('Abbreviation cannot be empty');
    }

    if (!this.nutrient.code) {
      this.messages.push('Code cannot be empty');
    }

    if (!this.nutrient.name) {
      this.messages.push('Name cannot be empty');
    }

    if (!this.nutrient.unit) {
      this.messages.push('Unit cannot be empty');
    }

    if (!this.nutrient.sortOrder) {
      this.messages.push('Sort Order cannot be empty');
    }

    if (this.messages.length > 0) {
      return;
    }

    this.nutrientService.update(this.nutrient)
      .subscribe((json: any) => {
        this.router.navigateByUrl('/nutrients');
      });
  }

  private loadNutrient(nutrientId: number): void {
    this.nutrientService.find(nutrientId)
      .subscribe((json: any) => {
        this.nutrient = json;
      });
  }

}
