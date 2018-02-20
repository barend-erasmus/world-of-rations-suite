import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-billing-route',
  templateUrl: './billing-route.component.html',
  styleUrls: ['./billing-route.component.css']
})
export class BillingRouteComponent extends BaseComponent implements OnInit {

  public paidPayments: any[] = [];
  public payments: any[] = [];

  constructor(http: Http, loaderService: LoaderService, private route: ActivatedRoute) {
    super(http, loaderService, true);
  }

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['paymentId']) {
        this.initialize().then(() => {
          this.verifyPayment(params['paymentId']);
        });
      } else {
        this.initialize().then(() => {
          this.loadPayments();
        });
      }
    });
  }

  public onClick_Assign(subscription: string): void {
    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/subscription/change?subscription=${subscription}`, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        window.location.reload();

        this.loaderService.endRequest();
      });
  }

  public selectSubscription(subscription: string): void {

    if (subscription !== 'standard' && subscription !== 'premium') {
      this.onClick_Assign(subscription);
      return;
    }

    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/payment/create?subscription=${subscription}`, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        window.location.href = json.uri;
      });
  }

  private loadPayments(): void {

    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/payment/list`, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.payments = json;
        this.paidPayments = this.payments.filter((payment) => payment.paid);

        this.payments.forEach((payment) => {
          payment.paidTimestamp = new Date(payment.paidTimestamp);
        });

        this.loaderService.endRequest();
      });
  }

  private loadPaymentsAndAssign(paymentId: string): void {

    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/payment/list`, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.payments = json;
        this.paidPayments = this.payments.filter((payment) => payment.paid);

        this.payments.forEach((payment) => {
          payment.paidTimestamp = new Date(payment.paidTimestamp);
        });

        const unassignedPayment = this.payments.find((x) => x.paymentId === paymentId && x.paid && !x.assigned);

        if (unassignedPayment) {
          this.onClick_Assign(unassignedPayment.subscription);
        }

        this.loaderService.endRequest();
      });
  }

  private createElementFromHTML(html: string): any {
    const div = document.createElement('div');
    div.innerHTML = html.trim();

    return div.firstChild;
  }

  private redirectPost(form: string): void {
    const element = this.createElementFromHTML(form);

    document.body.appendChild(element);
    element.submit();
  }


  private verifyPayment(paymentId: string): void {
    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/payment/verify?paymentId=${paymentId}`, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.loadPaymentsAndAssign(paymentId);

        this.loaderService.endRequest();
      });
  }
}
