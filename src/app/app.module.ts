import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListDashboardComponent } from './todo-list-dashboard/todo-list-dashboard.component';
import { TodoListItemComponent } from './shared/views/todo-list-item/todo-list-item.component';
import { TopNavbarComponent } from './shared/views/top-navbar/top-navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { GoogleSignInComponent } from './shared/views/google-sign-in/google-sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListDashboardComponent,
    TodoListItemComponent,
    TopNavbarComponent,
    GoogleSignInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
