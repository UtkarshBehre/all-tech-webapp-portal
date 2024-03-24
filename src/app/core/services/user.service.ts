import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IUserCreateRequest, IUserResponse, IUserUpdateRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  config: any;
  constructor(private httpClient: HttpClient) { 
    this.config = environment.services_config;
  }

  getUser(): Observable<IUserResponse> {
    return this.httpClient.get<IUserResponse>(`${this.config.endpoint_base_url}${this.config.user.endpoint_get}`);
  }

  updateUser(id: string, userUpdateRequest: IUserUpdateRequest, ): Observable<IUserResponse> {
    return this.httpClient.put<IUserResponse>(`${this.config.endpoint_base_url}${this.config.user.endpoint_update}${id}`, userUpdateRequest);
  }

  deleteUser(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.config.endpoint_base_url}${this.config.user.endpoint_delete}${id}`);
  }
}
