import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NutrientService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  public create(nutrient: any): Observable<any> {
    return this.post(`/nutrient/create`, nutrient);
  }

  public find(nutrientId: number): Observable<any> {
    return this.get(`/nutrient/find?nutrientId=${nutrientId}`);
  }

  public list(): Observable<any> {
    return this.get(`/nutrient/list`);
  }

  public update(nutrient: any): Observable<any> {
    return this.post(`/nutrient/update`, nutrient);
  }

}
