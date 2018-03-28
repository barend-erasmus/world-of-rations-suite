import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { LoaderService } from '../loader.service';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent extends BaseComponent implements OnInit {

  public year: number = new Date().getUTCFullYear();

  constructor(
    loaderService: LoaderService,
    subscriptionService: SubscriptionService,
    userService: UserService,
  ) {
    super(false, loaderService, subscriptionService, userService);
  }

  public ngOnInit(): void {
    this.initialize().subscribe(() => {

    });
  }

}
