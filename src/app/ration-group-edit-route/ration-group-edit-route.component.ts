import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
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

  public diets: any[] = [];

  public messages: string[] = [];

  public subDietGroups: any[] = [];

  constructor(
    private dietService: DietService,
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
    this.route.params.subscribe((params: Params): void => {
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

    this.dietGroupService.update(this.dietGroup)
      .subscribe((json: any) => {
        this.router.navigateByUrl(`/ration/groups${this.dietGroup.parent ? `/edit/${this.dietGroup.parent.id}` : ''}`);
      });
  }


  private loadDietGroup(dietGroupId: number): void {
    this.dietGroupService.find(dietGroupId)
      .subscribe((json: any) => {
        // TODO: Move to method
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
    this.dietGroupService.list(this.dietGroup.id)
      .subscribe((json: any) => {
        this.subDietGroups = json;
      });
  }

  private loadDiets(): void {
    this.dietService.list(this.dietGroup.id)
      .subscribe((json: any) => {
        if (this.subscription.permissions.indexOf('super-user') > -1) {
          this.diets = json;
        } else {
          this.diets = json.filter((x) => x.userName === this.user.email);
        }
      });
  }

}
