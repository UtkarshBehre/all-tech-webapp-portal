import { SocialUser } from "@abacritt/angularx-social-login";
import { AllTechAuthService } from "../services/all-tech-auth.service";
import { CookieService } from "ngx-cookie-service";

export class TodoStore {

    socialUser: SocialUser | null = null;

    constructor(private cookieService: CookieService) {

    }

    setUser(user: SocialUser): void {
        this.socialUser = user;
        this.cookieService.set('gid-token', user.idToken);
    }

    removeUser(): void {
        this.socialUser = null;
        this.cookieService.delete('gid-token');
    }

    acquireToken(): string {
        return this.socialUser?.idToken ?? '';
        // TODO: get from social user or from cookie and authenticate using google auth module
    }
}
