import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-nutrient-edit-route',
  templateUrl: './nutrient-edit-route.component.html',
  styleUrls: ['./nutrient-edit-route.component.css']
})
export class NutrientEditRouteComponent implements OnInit {

  public user: any = {};

  public nutrient: any = {};

  public messages: string[] = [];

  constructor(private http: Http, private router: Router, private route: ActivatedRoute, private loaderService: LoaderService) {
    this.loaderService.reset();
   }

  public ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.route.params.subscribe(params => {
      if (this.user.permissions.indexOf('view-nutrient') > -1) {
        this.loadNutrient(params['nutrientId']);
      }
    });
  }

  public onClick_Save(): void {

    this.messages = [];

    if (!this.nutrient.abbreviation) {
      this.messages.push('Abbreviation cannot be empty');
    }

    if (!this.nutrient.code) {
      this.messages.push('Code cannot be empty');
    }

    if (!this.nutrient.name) {
      this.messages.push('Name cannot be empty');
    }

    if (!this.nutrient.unit) {
      this.messages.push('Unit cannot be empty');
    }

    if (!this.nutrient.sortOrder) {
      this.messages.push('Sort Order cannot be empty');
    }

    if (this.messages.length > 0) {
      return;
    }

    this.loaderService.startRequest();

    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());
    headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

    this.http.post(`${environment.api.uri}/nutrient/update`, this.nutrient, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.router.navigateByUrl('/nutrients');

        this.loaderService.endRequest();
      });
  }

  private loadNutrient(nutrientId: number): void {

    this.loaderService.startRequest();

    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());
    headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

    this.http.get(`${environment.api.uri}/nutrient/find?nutrientId=${nutrientId}`, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.nutrient = json;

        this.loaderService.endRequest();
      });
  }

}
