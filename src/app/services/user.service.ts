import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  public info(): Observable<any> {
    return this.get(`/user/info`);
  }

  public update(user: any): Observable<any> {
    return this.post(`/user/update`, user);
  }

}
