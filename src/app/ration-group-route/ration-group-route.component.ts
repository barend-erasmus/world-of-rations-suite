import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';
import { UserService } from '../services/user.service';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-ration-group-route',
  templateUrl: './ration-group-route.component.html',
  styleUrls: ['./ration-group-route.component.css']
})
export class RationGroupRouteComponent extends BaseComponent implements OnInit {

  public user: any = {};

  public dietGroups: any[] = [];

  constructor(private http: HttpClient, subscriptionService: SubscriptionService, userService: UserService, loaderService: LoaderService) {
    super(subscriptionService, userService, loaderService, true);
  }

  public ngOnInit(): void {
    this.initialize().subscribe(() => {
      if (this.subscription.permissions.indexOf('view-diet-group') > -1) {
        this.loadDietGroups();
      }
    });
  }

  private loadDietGroups(): void {
    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/dietgroup/list`, {
      headers: this.getHeaders(),
    })
      .subscribe((json: any) => {
        if (this.subscription.permissions.indexOf('super-user') > -1) {
          this.dietGroups = json;
        } else {
          this.dietGroups = json.filter((x) => x.name === 'User Defined');
        }

        this.loaderService.endRequest();
      });
  }
}
