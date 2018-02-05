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
import { RationGroupCreateRouteComponent } from './ration-group-create-route/ration-group-create-route.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RationEditRouteComponent } from './ration-edit-route/ration-edit-route.component';
import { RationCreateRouteComponent } from './ration-create-route/ration-create-route.component';
import { FormulationRouteComponent } from './formulation-route/formulation-route.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader.service';
import { ProfileRouteComponent } from './profile-route/profile-route.component';
import { TipsRouteComponent } from './tips-route/tips-route.component';
import { FormulationViewRouteComponent } from './formulation-view-route/formulation-view-route.component';
import { BaseComponent } from './base/base.component';
import { MessagesComponent } from './messages/messages.component';
import { SafeHtmlPipe } from './safe-html.pipe';

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
    path: 'ration/groups/create/:dietGroupId',
    component: RationGroupCreateRouteComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: 'ration/groups/create',
    component: RationGroupCreateRouteComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: 'ration/edit/:dietId',
    component: RationEditRouteComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: 'ration/create/:dietGroupId',
    component: RationCreateRouteComponent,
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
    path: 'formulator/:formulationId',
    component: FormulatorRouteComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: 'formulations/:formulationId',
    component: FormulationViewRouteComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: 'formulations',
    component: FormulationRouteComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: 'profile',
    component: ProfileRouteComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: 'tips',
    component: TipsRouteComponent,
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
    RationGroupRouteComponent,
    RationGroupCreateRouteComponent,
    FooterComponent,
    HeaderComponent,
    RationEditRouteComponent,
    RationCreateRouteComponent,
    FormulationRouteComponent,
    LoaderComponent,
    ProfileRouteComponent,
    TipsRouteComponent,
    FormulationViewRouteComponent,
    BaseComponent,
    MessagesComponent,
    SafeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthGuard,
    LoaderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
