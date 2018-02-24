import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PaymentService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  public create(subscription: string): Observable<any> {
    return this.get(`/payment/create?subscription=${subscription}`);
  }

  public list(): Observable<any> {
    return this.get(`/payment/list`);
  }

  public verify(paymentId: string): Observable<any> {
    return this.get(`/payment/verify?paymentId=${paymentId}`);
  }

}
