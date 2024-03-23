import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { AllTechAuthService } from '../../core/services/all-tech-auth.service';
import { jwtDecode } from "jwt-decode";
import { OAuth2Client } from 'google-auth-library';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.scss'
})
export class TopNavbarComponent {
  socialUser!: SocialUser;
  
  constructor(
    private socialAuthService: SocialAuthService,
    private allTechAuthService: AllTechAuthService
  ) {}

  ngOnInit() {
    this.subOnUser();
  }

  subOnUser() {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.allTechAuthService.setUser(user);
    });
  }

  logOut(): void {
    this.allTechAuthService.removeUser();
    this.socialAuthService.signOut();
  }
}
