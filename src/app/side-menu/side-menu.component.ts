import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent extends BaseComponent implements OnInit {

  constructor(http: HttpClient, loaderService: LoaderService) {
    super(http, loaderService, false);
  }

  public ngOnInit(): void {
    this.initialize().then(() => {

    });
  }
}
