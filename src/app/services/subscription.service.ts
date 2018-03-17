import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseService } from './base.service';

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
