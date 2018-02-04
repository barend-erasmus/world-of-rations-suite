import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Http, Response, Headers } from '@angular/http';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {

  constructor(http: Http, loaderService: LoaderService) {
    super(http, loaderService);
  }

  public ngOnInit(): void {
    this.initialize().then(() => {

    });
  }

}
