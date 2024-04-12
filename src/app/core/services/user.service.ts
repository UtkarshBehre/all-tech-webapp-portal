import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUserCreateRequest, IUserResponse, IUserUpdateRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: IUserResponse;
  
  config: any;
  constructor(private httpClient: HttpClient) { 
    this.config = environment.todo_config;
  }

  async getUser(): Promise<IUserResponse> {
    
    if (!this.user) {
      this.user = await firstValueFrom(this.httpClient.get<IUserResponse>(`${this.config.endpoint_base_url}${this.config.user.endpoint_get}`));
    }
    return this.user;
  }

  async getUserByEmail(email: string): Promise<IUserResponse> {
    return await firstValueFrom(this.httpClient.get<IUserResponse>(`${this.config.endpoint_base_url}${this.config.user.endpoint_get_by_email}${email}`));
  }
}
