import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';
import { UserService } from '../services/user.service';
import { SubscriptionService } from '../services/subscription.service';
import { DietGroupService } from '../services/diet-group.service';

@Component({
  selector: 'app-ration-group-create-route',
  templateUrl: './ration-group-create-route.component.html',
  styleUrls: ['./ration-group-create-route.component.css']
})
export class RationGroupCreateRouteComponent extends BaseComponent implements OnInit {

  public dietGroup: any = {};

  public parentDietGroup: any = {};

  public messages: string[] = [];

  constructor(
    private dietGroupService: DietGroupService,
    loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router,
    subscriptionService: SubscriptionService,
    userService: UserService,
  ) {
    super(true, loaderService, subscriptionService, userService);
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

    this.dietGroupService.create(this.dietGroup)
      .subscribe((json: any) => {
        this.router.navigateByUrl(`/ration/groups/${this.parentDietGroup ? `/edit/${this.parentDietGroup.id}` : ''}`);

        this.loaderService.endRequest();
      });
  }


  private loadParentDietGroup(dietGroupId: number): void {

    this.loaderService.startRequest();

    this.dietGroupService.find(dietGroupId)
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
