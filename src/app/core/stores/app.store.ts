import { Injectable, Optional, SkipSelf } from "@angular/core";
import { AllTechAuthService } from "../services/all-tech-auth.service";
import { TodoStore } from "./todo.store";
import { CookieService } from "ngx-cookie-service";


@Injectable()
export class AppStore {

    todoStore: TodoStore;

    constructor(@Optional() @SkipSelf() appStore: AppStore, private cookieService: CookieService) {
        if (appStore) {
            throw new Error('You should not import AppStore directly');
        }

        this.todoStore = new TodoStore(cookieService);
    }
}
