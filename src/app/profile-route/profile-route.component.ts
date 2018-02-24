import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { BaseComponent } from '../base/base.component';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-route',
  templateUrl: './profile-route.component.html',
  styleUrls: ['./profile-route.component.css']
})
export class ProfileRouteComponent extends BaseComponent implements OnInit {

  public messages: string[] = [];

  constructor(private http: HttpClient, subscriptionService: SubscriptionService, userService: UserService, loaderService: LoaderService) {
    super(subscriptionService, userService, loaderService, true);
  }

  public ngOnInit(): void {
    this.initialize().subscribe(() => {

    });
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

    this.http.post(`${environment.api.uri}/user/update`, this.user, {
      headers: this.getHeaders(),
    })
      .subscribe((json: any) => {
        this.initialize();
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
}
