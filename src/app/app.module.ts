import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListDashboardComponent } from './dashboards/todo-list-dashboard/todo-list-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { LandingPageComponent } from './dashboards/landing-page/landing-page.component';
import { PageNotFoundComponent } from './dashboards/page-not-found/page-not-found.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoListItemComponent } from './shared/todo-list-item/todo-list-item.component';
import { TopNavbarComponent } from './shared/top-navbar/top-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListDashboardComponent,
    TodoListItemComponent,
    TopNavbarComponent,
    LandingPageComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  providers: [
    CookieService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('881549052903-kukg6rgda4amsud9vh12eqoflu9m283d.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
