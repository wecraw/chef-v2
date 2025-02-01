import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [HttpClientModule],
  template: `
    @if(temperature !== null) {
    <div class="weather-widget">
      <!-- White SVG weather icon (a simple sun icon) -->
      <!-- <svg class="weather-icon" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg> -->
      <!-- Temperature text (number + degree symbol) -->
      <div class="temperature">{{ temperature }}&#176;</div>
    </div>
    }
  `,
  styles: [
    `
      .weather-widget {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* Optional: add some padding if needed */
        padding: 5px;
        z-index: 2;
      }
      .weather-icon {
        width: 20px;
        height: 20px;
        fill: white;
      }
      .temperature {
        color: white;
        font-size: 12px;
        // margin-top: 3px;
        font-family: 'Archivo Black', sserif;
      }
    `,
  ],
})
export class WeatherComponent implements OnInit {
  // Will hold the current temperature in Fahrenheit (as an integer)
  temperature: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Open-Meteo API for Chicago, IL (latitude: 41.8781, longitude: -87.6298)
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=41.8781&longitude=-87.6298&current_weather=true&temperature_unit=fahrenheit';
    this.http.get<any>(url).subscribe({
      next: (data) => {
        if (
          data &&
          data.current_weather &&
          data.current_weather.temperature !== undefined
        ) {
          // Round the temperature to an integer before display
          this.temperature = Math.round(data.current_weather.temperature);
        }
      },
      error: (err) => {
        console.error('Error fetching weather data:', err);
      },
    });
  }
}
