import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { TodoItemComponent } from './dashboards/todo-list-dashboard/todo-group/todo-item/todo-item.component';
import { TopNavbarComponent } from './shared/top-navbar/top-navbar.component';
import { AllTechServiceInterceptor } from './core/auth/interceptors/all-tech-service-interceptor';
import { TodoGroupComponent } from './dashboards/todo-list-dashboard/todo-group/todo-group.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TodoGroupCreateComponent } from './dashboards/todo-list-dashboard/todo-group/todo-group-create/todo-group-create.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TodoGroupUpdateComponent } from './dashboards/todo-list-dashboard/todo-group/todo-group-update/todo-group-update.component';
import { ChatDashboardComponent } from './dashboards/chat-dashboard/chat-dashboard.component';
import { TodoGroupShareComponent } from './dashboards/todo-list-dashboard/todo-group/todo-group-share/todo-group-share.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListDashboardComponent,
    TodoItemComponent,
    TopNavbarComponent,
    LandingPageComponent,
    PageNotFoundComponent,
    TodoGroupComponent,
    TodoGroupCreateComponent,
    TodoGroupUpdateComponent,
    ChatDashboardComponent,
    TodoGroupShareComponent
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
    MatCheckboxModule,
    MatSidenavModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AllTechServiceInterceptor, multi: true },
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
