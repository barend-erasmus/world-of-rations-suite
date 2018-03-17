import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseService } from './base.service';

@Injectable()
export class FormulationService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  public composition(formulationId: number): Observable<any> {
    return this.get(`/formulation/composition?formulationId=${formulationId}`);
  }

  public find(formulationId: number): Observable<any> {
    return this.get(`/formulation/find?formulationId=${formulationId}`);
  }

  public list(): Observable<any> {
    return this.get(`/formulation/list`);
  }

  public supplement(formulationId: number): Observable<any> {
    return this.get(`/formulation/supplement?formulationId=${formulationId}`);
  }


}
