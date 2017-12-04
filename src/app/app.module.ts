import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeRouteComponent } from './home-route/home-route.component';
import { LoginRouteComponent } from './login-route/login-route.component';
import { AuthGuard } from './auth.guard';
import { NutrientRouteComponent } from './nutrient-route/nutrient-route.component';
import { NutrientEditRouteComponent } from './nutrient-edit-route/nutrient-edit-route.component';
import { NutrientCreateRouteComponent } from './nutrient-create-route/nutrient-create-route.component';
import { FormulatorRouteComponent } from './formulator-route/formulator-route.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { RationGroupEditRouteComponent } from './ration-group-edit-route/ration-group-edit-route.component';
import { FeedstuffRouteComponent } from './feedstuff-route/feedstuff-route.component';
import { RationGroupRouteComponent } from './ration-group-route/ration-group-route.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeRouteComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: 'ration/groups',
    component: RationGroupRouteComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: 'ration/groups/edit/:dietGroupId',
    component: RationGroupEditRouteComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: 'feedstuffs',
    component: FeedstuffRouteComponent,
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
    path: 'nutrients/create',
    component: NutrientCreateRouteComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: 'formulator',
    component: FormulatorRouteComponent,
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
    NutrientRouteComponent,
    NutrientEditRouteComponent,
    NutrientCreateRouteComponent,
    FormulatorRouteComponent,
    SideMenuComponent,
    RationGroupEditRouteComponent,
    FeedstuffRouteComponent,
    RationGroupRouteComponent
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
