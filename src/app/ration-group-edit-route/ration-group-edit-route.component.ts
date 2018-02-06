import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-ration-group-edit-route',
  templateUrl: './ration-group-edit-route.component.html',
  styleUrls: ['./ration-group-edit-route.component.css']
})
export class RationGroupEditRouteComponent extends BaseComponent implements OnInit {

  public dietGroup: any = {};

  public subDietGroups: any[] = [];

  public diets: any[] = [];

  public messages: string[] = [];

  constructor(http: Http, private router: Router, private route: ActivatedRoute, loaderService: LoaderService) {
    super(http, loaderService, true);
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.initialize().then(() => {
        if (this.subscription.permissions.indexOf('view-diet-group') > -1) {
          this.loadDietGroup(params['dietGroupId']);
        }
      });
    });
  }

  public onClick_Save(): void {

    this.messages = [];

    if (!this.dietGroup.name) {
      this.messages.push('Name cannot be empty');
    }

    if (this.messages.length > 0) {
      return;
    }

    this.loaderService.startRequest();

    this.http.post(`${environment.api.uri}/dietgroup/update`, this.dietGroup, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.router.navigateByUrl(`/ration/groups${this.dietGroup.parent ? `/edit/${this.dietGroup.parent.id}` : ''}`);

        this.loaderService.endRequest();
      });
  }


  private loadDietGroup(dietGroupId: number): void {

    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/dietgroup/find?id=${dietGroupId}`, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.dietGroup = json;

        const groupChart: string[] = [];

        let group: any = this.dietGroup.parent;

        while (group) {
          groupChart.push(group.name);

          group = group.parent;
        }

        groupChart.reverse();

        this.dietGroup.groupChart = groupChart.join(' - ');

        this.loadSubDietGroups();
        this.loadDiets();

        this.loaderService.endRequest();
      });
  }

  private loadSubDietGroups(): void {

    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/dietgroup/list?dietGroupId=${this.dietGroup.id}`, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.subDietGroups = json;

        this.loaderService.endRequest();
      });
  }

  private loadDiets(): void {

    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/diet/list?dietGroupId=${this.dietGroup.id}`, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        if (this.subscription.permissions.indexOf('super-user') > -1) {
          this.diets = json;
        } else {
          this.diets = json.filter((x) => x.userName === this.user.email);
        }

        this.loaderService.endRequest();
      });
  }
}
