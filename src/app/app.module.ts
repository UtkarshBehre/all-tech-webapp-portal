import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListDashboardComponent } from './todo-list-dashboard/todo-list-dashboard.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TodoListItemComponent } from './shared/views/todo-list-item/todo-list-item.component';
import { TopNavbarComponent } from './shared/views/top-navbar/top-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListDashboardComponent,
    TodoListItemComponent,
    TopNavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
