import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html',
  styleUrl: './google-sign-in.component.scss'
})
export class GoogleSignInComponent {
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  constructor(
    private socialAuthService: SocialAuthService,
    private cookieService: CookieService
  ) {}
  ngOnInit() {
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
