import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { tap } from 'rxjs/operators';
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

  protected initialize(): Observable<any> {
    return forkJoin([
      this.subsciptionService.find(),
      this.userService.info(),
    ]).pipe(
      tap((results: any[]) => {
        this.subscription = results[0];

        this.subscription.endTimestamp = this.subscription.endTimestamp ? new Date(this.subscription.endTimestamp) : null;
        this.subscription.startTimestamp = this.subscription.startTimestamp ? new Date(this.subscription.startTimestamp) : null;

        this.user = results[1];
      })
    );
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return headers;
  }

}
