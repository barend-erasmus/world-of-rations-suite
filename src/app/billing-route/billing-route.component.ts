import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-billing-route',
  templateUrl: './billing-route.component.html',
  styleUrls: ['./billing-route.component.css']
})
export class BillingRouteComponent extends BaseComponent implements OnInit {

  public payments: any[] = [];

  constructor(http: Http, loaderService: LoaderService) {
    super(http, loaderService);
  }

  public ngOnInit(): void {
    this.initialize().then(() => {
      this.loadPayments();
    });
  }

  private loadPayments(): void {

    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/payment/list`, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.payments = json;

        this.loaderService.endRequest();
      });
  }

  private selectSubscription(subscription: string): void {
    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/payment/create?subscription=${subscription}`, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        window.location.href = json.uri;

        this.loaderService.endRequest();
      });
  }
}
