import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/forkJoin';
import { LoaderService } from '../loader.service';
import { environment } from '../../environments/environment';

// @Component({
//   selector: 'app-base',
//   templateUrl: './base.component.html',
//   styleUrls: ['./base.component.css']
// })
export class BaseComponent {

  public subscription: any = null;
  public user: any = null;

  constructor(protected http: HttpClient, protected loaderService: LoaderService, isRouteCompoment: boolean) {
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

  protected initialize(): Promise<any> {
    this.loaderService.startRequest();

    return Promise.all([
      this.loadSubscription(),
      this.loadUser(),
    ]).then((results: any[]) => {

      this.subscription = results[0];

      this.subscription.expiryTimestamp = this.subscription.expiryTimestamp ? new Date(this.subscription.expiryTimestamp) : null;
      this.subscription.startTimestamp = this.subscription.startTimestamp ? new Date(this.subscription.startTimestamp) : null;

      this.user = results[1];

      this.loaderService.endRequest();
    });
  }

  private loadSubscription(): Promise<any> {
    return this.http.get(`${environment.api.uri}/subscription/find`, {
      headers: this.getHeaders(),
    }).toPromise();
  }

  private loadUser(): Promise<any> {
    return this.http.get(`${environment.api.uri}/user/info`, {
      headers: this.getHeaders(),
    }).toPromise();
  }

}
