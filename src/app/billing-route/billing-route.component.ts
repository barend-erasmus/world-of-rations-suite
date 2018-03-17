import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { BaseComponent } from '../base/base.component';
import { LoaderService } from '../loader.service';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-billing-route',
  templateUrl: './billing-route.component.html',
  styleUrls: ['./billing-route.component.css']
})
export class BillingRouteComponent extends BaseComponent implements OnInit {

  constructor(
    loaderService: LoaderService,
    private route: ActivatedRoute,
    subscriptionService: SubscriptionService,
    userService: UserService,
  ) {
    super(true, loaderService, subscriptionService, userService);
  }

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.initialize().subscribe(() => {

        });
    });
  }

  public selectSubscription(subscription: string): void {
    this.loaderService.startRequest();

    this.subsciptionService.create(subscription)
      .subscribe((json: any) => {
        window.location.href = json;

        this.loaderService.endRequest();
      });
  }


}
