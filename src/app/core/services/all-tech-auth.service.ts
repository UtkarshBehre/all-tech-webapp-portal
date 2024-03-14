import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { AppStore } from '../stores/app.store';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AllTechAuthService {

  // app store has to be public because appStore is skeleton class
  constructor(public appStore: AppStore) { } 
  
  setUser(user: SocialUser): void {
    this.appStore.todoStore.setUser(user);
  }

  removeUser(): void {
    this.appStore.todoStore.removeUser();
  }

  acquireToken(): string {
    return this.appStore.todoStore.acquireToken();
  }
}
