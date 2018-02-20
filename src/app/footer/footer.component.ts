import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent extends BaseComponent implements OnInit {

  constructor(http: HttpClient, loaderService: LoaderService) {
    super(http, loaderService, false);
  }

  public ngOnInit(): void {
    this.initialize().then(() => {

    });
  }
}
