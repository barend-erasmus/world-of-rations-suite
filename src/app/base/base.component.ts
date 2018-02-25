import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import 'rxjs/add/observable/forkJoin';
import { LoaderService } from '../loader.service';
import { environment } from '../../environments/environment';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Subscription } from 'rxjs/Subscription';
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

        this.subscription.expiryTimestamp = this.subscription.expiryTimestamp ? new Date(this.subscription.expiryTimestamp) : null;
        this.subscription.startTimestamp = this.subscription.startTimestamp ? new Date(this.subscription.startTimestamp) : null;

        this.user = results[1];

        this.loaderService.endRequest();
      })
    );
  }
}
