import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SubscriptionService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  public create(type: string): Observable<any> {
    return this.post(`/subscription/create`, {
      type,
    });
  }

  public find(): Observable<any> {
    return this.get(`/subscription/find`);
  }

}
