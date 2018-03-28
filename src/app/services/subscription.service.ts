import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseService } from './base.service';
import { LoaderService } from '../loader.service';

@Injectable()
export class SubscriptionService extends BaseService {

  constructor(http: HttpClient, loaderService: LoaderService) {
    super(http, loaderService);
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
