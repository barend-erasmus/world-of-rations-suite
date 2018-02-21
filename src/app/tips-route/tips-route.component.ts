import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-tips-route',
  templateUrl: './tips-route.component.html',
  styleUrls: ['./tips-route.component.css']
})
export class TipsRouteComponent extends BaseComponent implements OnInit {

  constructor(http: HttpClient, loaderService: LoaderService) {
    super(http, loaderService, true);
  }

  public ngOnInit(): void {
    this.initialize().then(() => {

    });
  }
}
