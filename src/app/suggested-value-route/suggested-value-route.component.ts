import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-suggested-value-route',
  templateUrl: './suggested-value-route.component.html',
  styleUrls: ['./suggested-value-route.component.css']
})
export class SuggestedValueRouteComponent extends BaseComponent implements OnInit {

  public suggestedValues: any[] = [];

  constructor(http: Http, loaderService: LoaderService) {
    super(http, loaderService, true);
  }

  public ngOnInit(): void {
    this.initialize().then(() => {
      if (this.subscription.permissions.indexOf('view-suggested-value') > -1) {
        this.loadSuggestedValues();
      }
    });
  }

  private loadSuggestedValues(): void {
    this.loaderService.startRequest();

    this.http.get(`${environment.api.uri}/suggestedvalue/list`, {
      headers: this.getHeaders(),
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.suggestedValues = json;

        this.loaderService.endRequest();
      });
  }
}
