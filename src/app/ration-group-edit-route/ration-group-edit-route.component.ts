import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';
import { UserService } from '../services/user.service';
import { SubscriptionService } from '../services/subscription.service';
import { DietGroupService } from '../services/diet-group.service';
import { DietService } from '../services/diet.service';

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

  constructor(
    private dietService: DietService,
    private dietGroupService: DietGroupService,
    loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router,
    subscriptionService: SubscriptionService,
    userService: UserService,
  ) {
    super(subscriptionService, userService, loaderService, true);
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.initialize().subscribe(() => {
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

    this.dietGroupService.update(this.dietGroup)
      .subscribe((json: any) => {
        this.router.navigateByUrl(`/ration/groups${this.dietGroup.parent ? `/edit/${this.dietGroup.parent.id}` : ''}`);

        this.loaderService.endRequest();
      });
  }


  private loadDietGroup(dietGroupId: number): void {
    this.loaderService.startRequest();

    this.dietGroupService.find(dietGroupId)
      .subscribe((json: any) => {
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

    this.dietGroupService.list(this.dietGroup.id)
      .subscribe((json: any) => {
        this.subDietGroups = json;

        this.loaderService.endRequest();
      });
  }

  private loadDiets(): void {
    this.loaderService.startRequest();

    this.dietService.list(this.dietGroup.id)
      .subscribe((json: any) => {
        if (this.subscription.permissions.indexOf('super-user') > -1) {
          this.diets = json;
        } else {
          this.diets = json.filter((x) => x.userName === this.user.email);
        }

        this.loaderService.endRequest();
      });
  }
}
