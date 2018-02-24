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

}
