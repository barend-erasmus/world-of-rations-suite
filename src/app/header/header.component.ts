import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {

  constructor(http: HttpClient, loaderService: LoaderService) {
    super(http, loaderService, false);
  }

  public ngOnInit(): void {
    this.initialize().then(() => {

    });
  }

}
