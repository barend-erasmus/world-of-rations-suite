import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { LoaderService } from '../loader.service';
import { UserService } from '../services/user.service';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-tips-route',
  templateUrl: './tips-route.component.html',
  styleUrls: ['./tips-route.component.css']
})
export class TipsRouteComponent extends BaseComponent implements OnInit {

  constructor(
    loaderService: LoaderService,
    subscriptionService: SubscriptionService,
    userService: UserService,
  ) {
    super(subscriptionService, userService, loaderService, true);
  }

  public ngOnInit(): void {
    this.initialize().subscribe(() => {

    });
  }
}
