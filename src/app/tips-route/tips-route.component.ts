import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tips-route',
  templateUrl: './tips-route.component.html',
  styleUrls: ['./tips-route.component.css']
})
export class TipsRouteComponent implements OnInit {

  public user: any = {};

  constructor() { }

  public ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
