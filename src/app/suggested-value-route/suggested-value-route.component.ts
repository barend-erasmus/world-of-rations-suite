import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';
import { UserService } from '../services/user.service';
import { SubscriptionService } from '../services/subscription.service';
import { SuggestedValueService } from '../services/suggested-value.service';

@Component({
  selector: 'app-suggested-value-route',
  templateUrl: './suggested-value-route.component.html',
  styleUrls: ['./suggested-value-route.component.css']
})
export class SuggestedValueRouteComponent extends BaseComponent implements OnInit {

  public suggestedValues: any[] = [];

  constructor(
    loaderService: LoaderService,
    subscriptionService: SubscriptionService,
    private suggestedValueService: SuggestedValueService,
    userService: UserService,
  ) {
    super(subscriptionService, userService, loaderService, true);
  }

  public ngOnInit(): void {
    this.initialize().subscribe(() => {
      if (this.subscription.permissions.indexOf('view-suggested-value') > -1) {
        this.loadSuggestedValues();
      }
    });
  }

  private loadSuggestedValues(): void {
    this.loaderService.startRequest();

    this.suggestedValueService.list()
      .subscribe((json: any) => {
        this.suggestedValues = json;

        for (const suggestedValue of this.suggestedValues) {
          const groupChart: string[] = [];

          let group: any = suggestedValue.dietGroup;

          while (group) {
            groupChart.push(group.name);

            group = group.parent;
          }

          groupChart.reverse();

          suggestedValue.dietGroup.groupChart = groupChart.join(' - ');
        }

        this.loaderService.endRequest();
      });
  }
}
