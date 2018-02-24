import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { LoaderService } from '../loader.service';
import * as moment from 'moment';
import { UserService } from '../services/user.service';
import { SubscriptionService } from '../services/subscription.service';

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
    super(subscriptionService, userService, loaderService, false);
  }

  public ngOnInit(): void {
    this.initialize().subscribe(() => {
      this.buildMessages();
    });
  }

  private buildMessages(): void {
    if (this.subscription.expired) {
      this.messages.push({
        text: `Your ${this.subscription.type.toUpperCase()} Subscription has expired on ${moment(this.subscription.expiryTimestamp).format('DD MMMM YYYY')}. <a href="/billing">Go to Billing</a>`,
        type: 'danger',
      });
    } else if (this.subscription.expiryTimestamp && moment.duration(this.subscription.expiryTimestamp.getTime() - new Date().getTime()).days() <= 10) {
      this.messages.push({
        text: `Your ${this.subscription.type.toUpperCase()} Subscription expires in ${moment.duration(this.subscription.expiryTimestamp.getTime() - new Date().getTime()).days()} days.`,
        type: 'info',
      });
    }
  }
}
