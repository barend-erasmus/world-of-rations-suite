import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-profile-route',
  templateUrl: './profile-route.component.html',
  styleUrls: ['./profile-route.component.css']
})
export class ProfileRouteComponent implements OnInit {

  public user: any = {};

  public messages: string[] = [];

  constructor(private http: Http, private loaderService: LoaderService) { }

  public ngOnInit(): void {
    this.loadUser();
  }

  public onClick_Save(): void {

    this.messages = [];

    if (!this.user.displayName) {
      this.messages.push('Display Name cannot be empty');
    }

    if (!this.user.locale) {
      this.messages.push('Locale cannot be empty');
    }

    if (this.messages.length > 0) {
      return;
    }

    this.loaderService.startRequest();

    const headers = new Headers();
    headers.append('x-application-id', environment.application.id.toString());
    headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

    this.http.post(`${environment.api.uri}/user/update`, this.user, {
      headers,
    })
      .map((res: Response) => res.json()).subscribe((json) => {
        this.loadUser();
        this.loaderService.endRequest();
      });
  }

  public onChange_PictureUpload(event: any): void {
    const reader: FileReader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {

      const file = event.target.files[0];

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.user.picture = reader.result;
      };
    }
  }

  private loadUser(): void {

    this.loaderService.startRequest();

    const accessToken = localStorage.getItem('token');

    const headers = new Headers();
    headers.append('authorization', `Bearer ${accessToken}`);

    this.http.get(`${environment.api.uri}/user/info`, {
      headers
    }).map((x) => x.json()).subscribe((json) => {
      this.user = json;
      localStorage.setItem('user', JSON.stringify(this.user));

      this.loaderService.endRequest();
    });
  }

}
