import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeRouteComponent } from './home-route/home-route.component';
import { LoginRouteComponent } from './login-route/login-route.component';
import { AuthGuard } from './auth.guard';
import { RationsRouteComponent } from './rations-route/rations-route.component';
import { NutrientRouteComponent } from './nutrient-route/nutrient-route.component';
import { NutrientEditRouteComponent } from './nutrient-edit-route/nutrient-edit-route.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeRouteComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: 'rations',
    component: RationsRouteComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: 'nutrients',
    component: NutrientRouteComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: 'nutrients/edit/:nutrientId',
    component: NutrientEditRouteComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: 'login',
    component: LoginRouteComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeRouteComponent,
    LoginRouteComponent,
    RationsRouteComponent,
    NutrientRouteComponent,
    NutrientEditRouteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
