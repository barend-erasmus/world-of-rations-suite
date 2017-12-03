import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-formulator-route',
  templateUrl: './formulator-route.component.html',
  styleUrls: ['./formulator-route.component.css']
})
export class FormulatorRouteComponent implements OnInit {

  public user: any = {};
  
    public dietGroupDropdowns: any[] = [];
  
    public selectedRation: any = null;
    public rations: any[] = [];
  
    constructor(private http: Http) { }
  
    public ngOnInit(): void {
      this.user = JSON.parse(localStorage.getItem('user'));
  
      this.loadDietGroupDropdown(null);
    }
  
    public onChange_DietGroupDropdown(index: number): void {
      if (index + 1 !== this.dietGroupDropdowns.length) {
        this.dietGroupDropdowns = this.dietGroupDropdowns.slice(0, index + 1);
      }
      this.loadDietGroupDropdown(this.dietGroupDropdowns[index].selectedItem.id);
    }
  
    private onDietGroupSelected(): void {
      const headers = new Headers();
      headers.append('x-application-id', environment.application.id.toString());
  
      this.http.get(`${environment.api.uri}/diet/list?dietGroupId=${this.dietGroupDropdowns[this.dietGroupDropdowns.length - 1].selectedItem.id}`, {
        headers,
      })
        .map((res: Response) => res.json()).subscribe((json) => {
          this.rations = json;
        });
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
