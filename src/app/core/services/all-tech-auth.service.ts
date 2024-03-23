import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllTechAuthService {
  socialUser: SocialUser | null = null;
  socialUserSubject = new Subject<SocialUser | null>();

  // app store has to be public because appStore is skeleton class
  constructor() { 
    this.socialUserSubject.subscribe((socialUser) => {
      this.socialUser = socialUser;
    });
  } 
  
  setUser(user: SocialUser): void {
    this.socialUserSubject.next(user);
  }

  removeUser(): void {
    this.socialUserSubject.next(null);
  }

  acquireToken(): string {
    return this.socialUser?.idToken ?? '';
  }
}
