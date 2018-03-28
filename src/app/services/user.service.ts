import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseService } from './base.service';
import { LoaderService } from '../loader.service';

@Injectable()
export class UserService extends BaseService {

  constructor(http: HttpClient, loaderService: LoaderService) {
    super(http, loaderService);
  }

  public info(): Observable<any> {
    return this.get(`/user/info`);
  }

  public update(user: any): Observable<any> {
    return this.post(`/user/update`, user);
  }

}
