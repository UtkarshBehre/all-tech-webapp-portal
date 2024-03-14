import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './dashboards/landing-page/landing-page.component';
import { TodoListDashboardComponent } from './dashboards/todo-list-dashboard/todo-list-dashboard.component';
import { PageNotFoundComponent } from './dashboards/page-not-found/page-not-found.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'todo', component: TodoListDashboardComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{
    provide: LocationStrategy, useClass: HashLocationStrategy
  }]
})
export class AppRoutingModule { }
