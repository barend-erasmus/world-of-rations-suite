import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home-route',
  templateUrl: './home-route.component.html',
  styleUrls: ['./home-route.component.css']
})
export class HomeRouteComponent implements OnInit {

  public user: any = {};

  public dietGroupDropdowns: any[] = []

  constructor(private http: Http) { }

  public ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.loadDietGroupDropdown(null);
  }

  public onChange_DietGroupDropdown(index: number): void {
    if (index + 1 != this.dietGroupDropdowns.length) {
      this.dietGroupDropdowns = this.dietGroupDropdowns.slice(0, index + 1);
    }
    this.loadDietGroupDropdown(this.dietGroupDropdowns[index].selectedItem.id);
  }

  private onDietGroupSelected(): void {

  }

  private loadDietGroupDropdown(dietGroupParentId: number): void {
    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());

    this.http.get(`${environment.api.uri}/dietgroup/list${dietGroupParentId ? `?dietGroupId=${dietGroupParentId}` : ''}`, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        if (json.length > 0) {
          this.dietGroupDropdowns.push({
            dietGroups: json,
            selectedItem: null,
          });
        } else {
          this.onDietGroupSelected();
        }
      });
  }

}
