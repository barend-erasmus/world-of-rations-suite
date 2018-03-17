import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseService } from './base.service';

@Injectable()
export class IngredientService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  public list(): Observable<any> {
    return this.get(`/ingredient/list`);
  }

}
