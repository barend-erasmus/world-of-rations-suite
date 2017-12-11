import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-route',
  templateUrl: './profile-route.component.html',
  styleUrls: ['./profile-route.component.css']
})
export class ProfileRouteComponent implements OnInit {

  public user: any = {};

  public messages: string[] = [];

  constructor() { }

  public ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}
