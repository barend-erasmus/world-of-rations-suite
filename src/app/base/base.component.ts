import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';

export class BaseComponent {

  public subscription: any = null;
  public user: any = null;

  constructor(
    isRouteCompoment: boolean,
    protected loaderService: LoaderService,
    protected subsciptionService: SubscriptionService,
    protected userService: UserService,
  ) {
    if (isRouteCompoment) {
      this.loaderService.reset();
    }
  }

  protected httpErrorHandler(error: any): void {
    if (error.status === 429) {
      window.location.href = '/TooManyRequests';
    }

    this.loaderService.endRequest();
  }

  protected getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return headers;
  }

  protected initialize(): Observable<any> {
    this.loaderService.startRequest();

    return forkJoin([
      this.subsciptionService.find(),
      this.userService.info(),
    ]).pipe(
      tap((results: any[]) => {
        this.subscription = results[0];

        this.subscription.endTimestamp = this.subscription.endTimestamp ? new Date(this.subscription.endTimestamp) : null;
        this.subscription.startTimestamp = this.subscription.startTimestamp ? new Date(this.subscription.startTimestamp) : null;

        this.user = results[1];

        this.loaderService.endRequest();
      })
    );
  }
}
