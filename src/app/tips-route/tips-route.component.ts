import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Http, Response, Headers } from '@angular/http';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-tips-route',
  templateUrl: './tips-route.component.html',
  styleUrls: ['./tips-route.component.css']
})
export class TipsRouteComponent extends BaseComponent implements OnInit {

  constructor(http: Http, loaderService: LoaderService) {
    super(http, loaderService, true);
  }

  public ngOnInit(): void {
    
  }
}
