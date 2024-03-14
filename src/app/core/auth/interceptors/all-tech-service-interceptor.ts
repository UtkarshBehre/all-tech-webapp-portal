import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, from, filter, map, mergeMap } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { AllTechAuthService } from "../../services/all-tech-auth.service";

@Injectable()
export class AllTechServiceInterceptor implements HttpInterceptor {

	constructor(protected readonly authService: AllTechAuthService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        const token = this.authService.acquireToken();
        console.log("token: ", token);
		// Set default headers
		request = request.clone({ setHeaders: 
            { 
                ContentType : 'application/json',
                Accept : 'application/json',
                Authorization : `Bearer ${token}`
            }});

		return next.handle(request);
	}
}
