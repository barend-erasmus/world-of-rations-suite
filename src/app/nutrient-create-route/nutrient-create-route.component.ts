import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-nutrient-create-route',
  templateUrl: './nutrient-create-route.component.html',
  styleUrls: ['./nutrient-create-route.component.css']
})
export class NutrientCreateRouteComponent extends BaseComponent implements OnInit {

  public nutrient: any = {};

  public messages: string[] = [];

  constructor(http: Http, private router: Router, private route: ActivatedRoute, loaderService: LoaderService) {
    super(http, loaderService, true);
  }

  public ngOnInit(): void {
    this.initialize().then(() => {

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

    this.http.post(`${environment.api.uri}/nutrient/create`, this.nutrient, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.router.navigateByUrl('/nutrients');

        this.loaderService.endRequest();
      }, (err) => {
        this.messages.push(err.json().message);

        this.loaderService.endRequest();
      });
  }
}
