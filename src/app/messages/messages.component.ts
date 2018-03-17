import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { BaseComponent } from '../base/base.component';
import { LoaderService } from '../loader.service';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent extends BaseComponent implements OnInit {

  public messages: { text: string, type: string, }[] = [];

  constructor(
    loaderService: LoaderService,
    subscriptionService: SubscriptionService,
    userService: UserService,
  ) {
    super(false, loaderService, subscriptionService, userService);
  }

  public ngOnInit(): void {
    this.initialize().subscribe(() => {
      this.buildMessages();
    });
  }

  private buildMessages(): void {
    if (this.subscription.expired) {
      this.messages.push({
        text: `Your ${this.subscription.type.toUpperCase()} Subscription has expired on ${moment(this.subscription.endTimestamp).format('DD MMMM YYYY')}. <a href="/billing">Go to Billing</a>`,
        type: 'danger',
      });
    } else if (this.subscription.endTimestamp && moment.duration(this.subscription.endTimestamp.getTime() - new Date().getTime()).days() <= 10) {
      this.messages.push({
        text: `Your ${this.subscription.type.toUpperCase()} Subscription expires in ${moment.duration(this.subscription.endTimestamp.getTime() - new Date().getTime()).days()} days.`,
        type: 'info',
      });
    }
  }
}
