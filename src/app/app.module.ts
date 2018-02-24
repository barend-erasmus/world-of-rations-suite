import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { BillingRouteComponent } from './billing-route/billing-route.component';
import { SuggestedValueRouteComponent } from './suggested-value-route/suggested-value-route.component';
import { SuggestedValueEditRouteComponent } from './suggested-value-edit-route/suggested-value-edit-route.component';
import { SubscriptionService } from './services/subscription.service';
import { UserService } from './services/user.service';
import { IngredientService } from './services/ingredient.service';
import { DietService } from './services/diet.service';
import { DietGroupService } from './services/diet-group.service';
import { FormulationService } from './services/formulation.service';
import { FormulatorService } from './services/formulator.service';
import { NutrientService } from './services/nutrient.service';
import { PaymentService } from './services/payment.service';
import { SuggestedValueService } from './services/suggested-value.service';

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
    path: 'billing',
    component: BillingRouteComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: 'login',
    component: LoginRouteComponent,
  },
  {
    path: 'suggestedvalue',
    component: SuggestedValueRouteComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: 'suggestedvalue/edit/:suggestedValueId',
    component: SuggestedValueEditRouteComponent,
    canActivate: [
      AuthGuard,
    ],
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
    MessagesComponent,
    SafeHtmlPipe,
    BillingRouteComponent,
    SuggestedValueRouteComponent,
    SuggestedValueEditRouteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthGuard,
    DietService,
    DietGroupService,
    FormulationService,
    FormulatorService,
    IngredientService,
    LoaderService,
    NutrientService,
    PaymentService,
    SubscriptionService,
    SuggestedValueService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
