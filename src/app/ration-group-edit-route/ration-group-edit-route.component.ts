import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-ration-group-edit-route',
  templateUrl: './ration-group-edit-route.component.html',
  styleUrls: ['./ration-group-edit-route.component.css']
})
export class RationGroupEditRouteComponent implements OnInit {

  public user: any = {};

  public dietGroup: any = {};

  public subDietGroups: any[] = [];

  public diets: any[] = [];

  public messages: string[] = [];

  constructor(private http: Http, private router: Router, private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.route.params.subscribe(params => {
      this.loadDietGroup(params['dietGroupId']);
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

    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());

    this.http.post(`${environment.api.uri}/dietgroup/update`, this.dietGroup, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.router.navigateByUrl(`/ration/groups${this.dietGroup.parent ? `/edit/${this.dietGroup.parent.id}` : ''}`);
      });
  }


  private loadDietGroup(dietGroupId: number): void {

    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());

    this.http.get(`${environment.api.uri}/dietgroup/find?id=${dietGroupId}`, {
      headers,
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
      });
  }

  private loadSubDietGroups(): void {
    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());

    this.http.get(`${environment.api.uri}/dietgroup/list?dietGroupId=${this.dietGroup.id}`, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.subDietGroups = json;
      });
  }

  private loadDiets(): void {
    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());

    this.http.get(`${environment.api.uri}/diet/list?dietGroupId=${this.dietGroup.id}`, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.diets = json;
      });
  }
}
