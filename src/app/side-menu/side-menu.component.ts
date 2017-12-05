import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  public user: any = {};

  constructor() { }

  public ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
