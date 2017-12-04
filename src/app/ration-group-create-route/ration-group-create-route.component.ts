import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-ration-group-create-route',
  templateUrl: './ration-group-create-route.component.html',
  styleUrls: ['./ration-group-create-route.component.css']
})
export class RationGroupCreateRouteComponent implements OnInit {

  public user: any = {};

  public dietGroup: any = {};

  public parentDietGroup: any = {};

  public messages: string[] = [];

  constructor(private http: Http, private router: Router, private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.route.params.subscribe(params => {
      if (params['dietGroupId']) {
        this.loadParentDietGroup(params['dietGroupId']);
      }
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

    this.dietGroup.parent = this.parentDietGroup;

    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());

    this.http.post(`${environment.api.uri}/dietgroup/create`, this.dietGroup, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.router.navigateByUrl(`/ration/groups/${this.parentDietGroup ? `/edit/${this.parentDietGroup.id}` : ''}`);
      });
  }


  private loadParentDietGroup(dietGroupId: number): void {

    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());

    this.http.get(`${environment.api.uri}/dietgroup/find?id=${dietGroupId}`, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.parentDietGroup = json;

        const groupChart: string[] = [];

        let group: any = this.parentDietGroup;

        while (group) {
          groupChart.push(group.name);

          group = group.parent;
        }

        groupChart.reverse();

        this.parentDietGroup.groupChart = groupChart.join(' - ');
      });
  }
}