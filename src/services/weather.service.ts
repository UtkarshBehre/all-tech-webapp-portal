import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  getWeather(): Observable<any> {
    return this.httpClient.get(`https://all-tech-webapp-service.azurewebsites.net/WeatherForecast`);
  }
}
