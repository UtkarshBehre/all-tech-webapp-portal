import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { IAllItemsResponse } from '../models/dashboard.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  config: any;

  constructor(private httpClient: HttpClient) { 
    this.config = environment.services_config;
  }

  public GetUserDashboardData(userId: string): Observable<IAllItemsResponse> {
    return this.httpClient.get<IAllItemsResponse>(`${this.config.endpoint_base_url}${this.config.dashboard.endpoint_get}${userId}`);
  }
}
