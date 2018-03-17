import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseService } from './base.service';

@Injectable()
export class DietGroupService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  public create(dietGroup: any): Observable<any> {
    return this.post(`/dietgroup/create`, dietGroup);
  }

  public find(dietGroupId: number): Observable<any> {
    return this.get(`/dietgroup/find?dietGroupId=${dietGroupId}`);
  }

  public list(dietGroupId: number): Observable<any> {
    return this.get(`/dietgroup/list${dietGroupId ? `?dietGroupId=${dietGroupId}` : ''}`);
  }

  public update(dietGroup: any): Observable<any> {
    return this.put(`/dietgroup/update`, dietGroup);
  }

}
