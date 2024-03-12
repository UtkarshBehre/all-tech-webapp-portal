import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.scss'
})
export class TopNavbarComponent {
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  
  constructor(
    private socialAuthService: SocialAuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.subOnUser();
  }

  subOnUser() {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(user);
      this.cookieService.set('gid-token', user.idToken);
    });
  }

  logOut(): void {
    this.cookieService.delete('gid-token');
    this.socialAuthService.signOut();
  }
}
