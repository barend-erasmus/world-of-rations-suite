import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseService } from './base.service';
import { LoaderService } from '../loader.service';

@Injectable()
export class NutrientService extends BaseService {

  constructor(http: HttpClient, loaderService: LoaderService) {
    super(http, loaderService);
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
    return this.put(`/nutrient/update`, nutrient);
  }

}
