import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FormulationService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  public composition(formulationId: number): Observable<any> {
    return this.get(`/formulation/composition?id=${formulationId}`);
  }

  public find(formulationId: number): Observable<any> {
    return this.get(`/formulation/find?id=${formulationId}`);
  }

  public list(): Observable<any> {
    return this.get(`/formulation/list`);
  }

  public supplement(formulationId: number): Observable<any> {
    return this.get(`/formulation/supplement?id=${formulationId}`);
  }


}
