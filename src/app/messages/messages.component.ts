import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Http, Response, Headers } from '@angular/http';
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
    super(http, loaderService);
  }

  public ngOnInit(): void {
    this.initialize().then(() => {
      this.buildMessages();
    });
  }

  private buildMessages(): void {
    if (this.subscription.expired && this.subscription.expiryTimestamp && this.subscription.expiryTimestamp.getTime() < new Date().getTime()) {
      this.messages.push({
        text: `Your ${this.subscription.type.toUpperCase()} Subscription has expired on ${moment(this.subscription.expiryTimestamp).format('DD MMMM YYYY')}.`,
        type: 'danger',
      });
    } else if (moment.duration(this.subscription.expiryTimestamp.getTime() - new Date().getTime()).days() <= 10)  {
      this.messages.push({
        text: `Your ${this.subscription.type.toUpperCase()} Subscription expires in ${moment.duration(this.subscription.expiryTimestamp.getTime() - new Date().getTime()).days()} days.`,
        type: 'info',
      });
    }
  }

}