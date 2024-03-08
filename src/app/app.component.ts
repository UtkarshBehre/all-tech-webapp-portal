import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'all-tech-webapp-portal';

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
  }

}
