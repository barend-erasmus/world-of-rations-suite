import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DietService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  public list(dietGroupId: number): Observable<any> {
    return this.get(`/diet/list?dietGroupId=${dietGroupId}`);
  }

}
