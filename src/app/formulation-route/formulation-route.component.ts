import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-formulation-route',
  templateUrl: './formulation-route.component.html',
  styleUrls: ['./formulation-route.component.css']
})
export class FormulationRouteComponent implements OnInit {

  public user: any = {};
  
    public formulations: any[] = [];
  
    constructor(private http: Http) { }
  
    public ngOnInit(): void {
      this.user = JSON.parse(localStorage.getItem('user'));
  
      this.loadNutrients();
    }
  
    private loadNutrients(): void {
  
      const headers = new Headers();
      headers.append('x-application-id', environment.application.id.toString());
      headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);
  
      this.http.get(`${environment.api.uri}/formulator/list`, {
        headers,
      })
        .map((res: Response) => res.json()).subscribe((json) => {
          this.formulations = json;
        });
    }
}
