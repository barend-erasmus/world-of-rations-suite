import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseService } from './base.service';

@Injectable()
export class FormulatorService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  public create(input: any): Observable<any> {
    return this.post(`/formulation/create`, input);
  }

}
