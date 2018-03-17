import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseService } from './base.service';

@Injectable()
export class DietService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  public create(diet: any): Observable<any> {
    return this.post(`/diet/create`, diet);
  }

  public find(dietId: number): Observable<any> {
    return this.get(`/diet/find?dietId=${dietId}`);
  }

  public list(dietGroupId: number): Observable<any> {
    return this.get(`/diet/list?dietGroupId=${dietGroupId}`);
  }

  public update(diet: any): Observable<any> {
    return this.put(`/diet/update`, diet);
  }

}
