import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { LoaderService } from '../loader.service';
import { DietGroupService } from '../services/diet-group.service';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-ration-group-route',
  templateUrl: './ration-group-route.component.html',
  styleUrls: ['./ration-group-route.component.css']
})
export class RationGroupRouteComponent extends BaseComponent implements OnInit {

  public dietGroups: any[] = [];

  constructor(
    private dietGroupService: DietGroupService,
    loaderService: LoaderService,
    subscriptionService: SubscriptionService,
    userService: UserService,
  ) {
    super(true, loaderService, subscriptionService, userService);
  }

  public ngOnInit(): void {
    this.initialize().subscribe(() => {
      if (this.subscription.permissions.indexOf('view-diet-group') > -1) {
        this.loadDietGroups();
      }
    });
  }

  private loadDietGroups(): void {
    this.dietGroupService.list(null)
      .subscribe((json: any) => {
        if (this.subscription.permissions.indexOf('super-user') > -1) {
          this.dietGroups = json;
        } else {
          this.dietGroups = json.filter((x) => x.name === 'User Defined');
        }
      });
  }

}
