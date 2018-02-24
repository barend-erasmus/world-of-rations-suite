import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';
import { UserService } from '../services/user.service';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-ration-group-create-route',
  templateUrl: './ration-group-create-route.component.html',
  styleUrls: ['./ration-group-create-route.component.css']
})
export class RationGroupCreateRouteComponent extends BaseComponent implements OnInit {

  public dietGroup: any = {};

  public parentDietGroup: any = {};

  public messages: string[] = [];

  constructor(private http: HttpClient, subscriptionService: SubscriptionService, userService: UserService, private router: Router, private route: ActivatedRoute, loaderService: LoaderService) {
    super(subscriptionService, userService, loaderService, true);
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.initialize().subscribe(() => {
        if (params['dietGroupId']) {
          this.loadParentDietGroup(params['dietGroupId']);
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

    this.dietGroup.parent = this.parentDietGroup;

    this.loaderService.startRequest();

    this.http.post(`${environment.api.uri}/dietgroup/create`, this.dietGroup, {
      headers: this.getHeaders(),
    })
      .subscribe((json: any) => {
        this.router.navigateByUrl(`/ration/groups/${this.parentDietGroup ? `/edit/${this.parentDietGroup.id}` : ''}`);

        this.loaderService.endRequest();
      });
  }


  private loadParentDietGroup(dietGroupId: number): void {

    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/dietgroup/find?id=${dietGroupId}`, {
      headers: this.getHeaders(),
    })
      .subscribe((json: any) => {
        this.parentDietGroup = json;

        const groupChart: string[] = [];

        let group: any = this.parentDietGroup;

        while (group) {
          groupChart.push(group.name);

          group = group.parent;
        }

        groupChart.reverse();

        this.parentDietGroup.groupChart = groupChart.join(' - ');

        this.loaderService.endRequest();
      });
  }
}
