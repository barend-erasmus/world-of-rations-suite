import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';
import { UserService } from '../services/user.service';
import { SubscriptionService } from '../services/subscription.service';
import { NutrientService } from '../services/nutrient.service';

@Component({
  selector: 'app-nutrient-create-route',
  templateUrl: './nutrient-create-route.component.html',
  styleUrls: ['./nutrient-create-route.component.css']
})
export class NutrientCreateRouteComponent extends BaseComponent implements OnInit {

  public nutrient: any = {};

  public messages: string[] = [];

  constructor(
    loaderService: LoaderService,
    private nutrientService: NutrientService,
    private router: Router,
    subscriptionService: SubscriptionService,
    userService: UserService,
  ) {
    super(subscriptionService, userService, loaderService, true);
  }

  public ngOnInit(): void {
    this.initialize().subscribe(() => {

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

    this.loaderService.startRequest();

    this.nutrientService.create(this.nutrient)
      .subscribe((json: any) => {
        this.router.navigateByUrl('/nutrients');

        this.loaderService.endRequest();
      }, (err) => {
        this.messages.push(err.json().message);

        this.loaderService.endRequest();
      });
  }
}
