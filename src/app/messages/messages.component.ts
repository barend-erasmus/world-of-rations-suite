import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Http } from '@angular/http';
import { LoaderService } from '../loader.service';
import * as moment from 'moment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent extends BaseComponent implements OnInit {

  public messages: { text: string, type: string, }[] = [];

  constructor(http: Http, loaderService: LoaderService) {
    super(http, loaderService, false);
  }

  public ngOnInit(): void {
    this.initialize().then(() => {
      this.buildMessages();
    });
  }

  private buildMessages(): void {
    if (this.subscription.expired) {
      this.messages.push({
        text: `Your ${this.subscription.type.toUpperCase()} Subscription has expired on ${moment(this.subscription.expiryTimestamp).format('DD MMMM YYYY')}. <a href="/billing">Go to Billing</a>`,
        type: 'danger',
      });
    } else if (this.subscription.expiryTimestamp && moment.duration(this.subscription.expiryTimestamp.getTime() - new Date().getTime()).days() <= 10)  {
      this.messages.push({
        text: `Your ${this.subscription.type.toUpperCase()} Subscription expires in ${moment.duration(this.subscription.expiryTimestamp.getTime() - new Date().getTime()).days()} days.`,
        type: 'info',
      });
    }
  }

}
