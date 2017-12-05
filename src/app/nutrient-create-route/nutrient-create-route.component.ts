import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-nutrient-create-route',
  templateUrl: './nutrient-create-route.component.html',
  styleUrls: ['./nutrient-create-route.component.css']
})
export class NutrientCreateRouteComponent implements OnInit {

  public user: any = {};

    public nutrient: any = {};

    public messages: string[] = [];

    constructor(private http: Http, private router: Router, private route: ActivatedRoute) { }

    public ngOnInit(): void {
      this.user = JSON.parse(localStorage.getItem('user'));
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

      const headers = new Headers();
      headers.append('x-application-id', environment.application.id.toString());
      headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

      this.http.post(`${environment.api.uri}/nutrient/create`, this.nutrient, {
        headers,
      })
        .map((res: Response) => res.json()).subscribe((json) => {
          this.router.navigateByUrl('/nutrients');
        }, (err) => {
          this.messages.push(err.json().message);
        });
    }
}
