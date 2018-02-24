import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';
import { UserService } from '../services/user.service';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-nutrient-route',
  templateUrl: './nutrient-route.component.html',
  styleUrls: ['./nutrient-route.component.css']
})
export class NutrientRouteComponent extends BaseComponent implements OnInit {

  public nutrients: any[] = [];

  constructor(private http: HttpClient, subscriptionService: SubscriptionService, userService: UserService, loaderService: LoaderService) {
    super(subscriptionService, userService, loaderService, true);
  }

  public ngOnInit(): void {
    this.initialize().subscribe(() => {
      if (this.subscription.permissions.indexOf('view-nutrient') > -1) {
        this.loadNutrients();
      }
    });
  }

  private loadNutrients(): void {
    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/nutrient/list`, {
      headers: this.getHeaders(),
    })
      .subscribe((json: any) => {
        this.nutrients = json;

        this.loaderService.endRequest();
      });
  }
}
