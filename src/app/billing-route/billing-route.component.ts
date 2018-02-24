import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-billing-route',
  templateUrl: './billing-route.component.html',
  styleUrls: ['./billing-route.component.css']
})
export class BillingRouteComponent extends BaseComponent implements OnInit {

  public paidPayments: any[] = [];
  public payments: any[] = [];

  constructor(
    loaderService: LoaderService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    subscriptionService: SubscriptionService,
    userService: UserService,
  ) {
    super(subscriptionService, userService, loaderService, true);
  }

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['paymentId']) {
        this.initialize().subscribe(() => {
          this.verifyPayment(params['paymentId']);
        });
      } else {
        this.initialize().subscribe(() => {
          this.loadPayments();
        });
      }
    });
  }

  public onClick_Assign(subscription: string): void {
    this.loaderService.startRequest();

    this.subsciptionService.change(subscription)
      .subscribe((json: any) => {
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

    this.paymentService.create(subscription).subscribe((json: any) => {
      window.location.href = json.uri;
    });
  }

  private loadPayments(): void {
    this.loaderService.startRequest();

    this.paymentService.list()
      .subscribe((json: any) => {
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

    this.paymentService.list()
      .subscribe((json: any) => {
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

  private verifyPayment(paymentId: string): void {
    this.loaderService.startRequest();

    this.paymentService.verify(paymentId)
      .subscribe((json: any) => {
        this.loadPaymentsAndAssign(paymentId);

        this.loaderService.endRequest();
      });
  }
}
