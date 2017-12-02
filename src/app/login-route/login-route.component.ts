import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-login-route',
  templateUrl: './login-route.component.html',
  styleUrls: ['./login-route.component.css']
})
export class LoginRouteComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  public ngOnInit(): void {
    if (this.activatedRoute) {
      this.activatedRoute.queryParams.subscribe((params: Params): void => {

        const parameters = this.router.url.split('#')[1].split('&').map((x) => {
          return {
            key: x.split('=')[0],
            value: x.split('=')[1],
          };
        });

        const accessToken: string = parameters.find((x) => x.key === 'access_token').value;
        localStorage.setItem('token', accessToken);
        this.router.navigateByUrl('/');
      });
    }
  }

}
