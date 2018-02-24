import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService extends BaseService {

  constructor(http: HttpClient) { 
    super(http);
  }

  public info(): Observable<any> {
    return this.get(`/user/info`);
  }

}