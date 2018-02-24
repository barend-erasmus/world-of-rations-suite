import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { LoaderService } from '../loader.service';
import { UserService } from '../services/user.service';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent extends BaseComponent implements OnInit {

  constructor(subscriptionService: SubscriptionService, userService: UserService, loaderService: LoaderService) {
    super(subscriptionService, userService, loaderService, false);
  }

  public ngOnInit(): void {
    this.initialize().subscribe(() => {

    });
  }
}
