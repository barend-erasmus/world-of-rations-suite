import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login-route',
  templateUrl: './login-route.component.html',
  styleUrls: ['./login-route.component.css']
})
export class LoginRouteComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params): void => {
      const parameters = decodeURIComponent(this.router.url).split('#').length > 1 ? decodeURIComponent(this.router.url).split('#')[1].split('&').map((x) => {
        return {
          key: x.split('=')[0],
          value: x.split('=')[1],
        };
      }) : [];

      const accessToken: string = parameters.find((x) => x.key === 'access_token') ?
        parameters.find((x) => x.key === 'access_token').value :
        null;

      if (accessToken) {
        localStorage.setItem('token', accessToken);
        this.router.navigateByUrl('/');
      } else {
        localStorage.removeItem('token');

        // TODO: Move client Id to config
        window.location.href = `https://worldofrations.auth0.com/v2/logout` +
          `?returnTo=${encodeURI(environment.application.uri)}&` +
          `client_id=qVN7NLKDr9ap_tFr3Ri9CZlQrnkcdEwf`;
      }
    });

  }

}
