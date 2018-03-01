import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SuggestedValueService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  public create(suggestedValue: any): Observable<any> {
    return this.post(`/suggestedvalue/create`, suggestedValue);
  }

  public find(dietId: number, ingredientId: number): Observable<any> {
    return this.get(`/suggestedvalue/find?dietId=${dietId}&ingredientId=${ingredientId}`);
  }

  public findById(suggestedValueId: number): Observable<any> {
    return this.get(`/suggestedvalue/findById?suggestedValueId=${suggestedValueId}`);
  }

  public list(): Observable<any> {
    return this.get(`/suggestedvalue/list`);
  }

  public remove(suggestedValueId: number): Observable<any> {
    return this.delete(`/suggestedvalue/remove?suggestedValueId=${suggestedValueId}`);
  }

  public update(suggestedValue: any): Observable<any> {
    return this.put(`/suggestedvalue/update`, suggestedValue);
  }
}
