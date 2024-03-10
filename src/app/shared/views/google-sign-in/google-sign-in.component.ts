import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';

@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html',
  styleUrl: './google-sign-in.component.scss'
})
export class GoogleSignInComponent {
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  constructor(
    private socialAuthService: SocialAuthService
  ) {}
  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(user);
    });
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }
}
