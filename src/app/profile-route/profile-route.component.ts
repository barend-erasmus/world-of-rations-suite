import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { LoaderService } from '../loader.service';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-route',
  templateUrl: './profile-route.component.html',
  styleUrls: ['./profile-route.component.css']
})
export class ProfileRouteComponent extends BaseComponent implements OnInit {

  public messages: string[] = [];

  constructor(
    loaderService: LoaderService,
    subscriptionService: SubscriptionService,
    userService: UserService,
  ) {
    super(true, loaderService, subscriptionService, userService);
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

    this.userService.update(this.user)
      .subscribe((json: any) => {
        this.ngOnInit();
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
