import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DietGroupService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  public find(dietGroupId: number): Observable<any> {
    return this.get(`/dietgroup/find?id=${dietGroupId}`);
  }

  public list(dietGroupId: number): Observable<any> {
    return this.get(`/dietgroup/list${dietGroupId ? `?dietGroupId=${dietGroupId}` : ''}`);
  }

}
