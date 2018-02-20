import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { BaseComponent } from '../base/base.component';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-suggested-value-route',
  templateUrl: './suggested-value-route.component.html',
  styleUrls: ['./suggested-value-route.component.css']
})
export class SuggestedValueRouteComponent extends BaseComponent implements OnInit {

  constructor(http: Http, loaderService: LoaderService) {
    super(http, loaderService, true);
  }

  public ngOnInit(): void {
    // this.initialize().then(() => {
    //   if (this.subscription.permissions.indexOf('view-nutrient') > -1) {
    //     this.loadNutrients();
    //   }
    // });
  }

}
