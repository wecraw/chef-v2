import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  template: `
    <div style="display: flex">
      <p>Chicago, IL:</p>

      <div *ngIf="temperature !== null" class="weather-widget">
        <!-- Weather Icon -->
        <img
          *ngIf="iconUrl"
          [src]="iconUrl"
          alt="Weather icon"
          class="weather-icon"
        />
        <!-- Temperature display -->
        <div class="temperature">{{ temperature }}&#176;</div>
      </div>
    </div>
  `,
  styles: [
    `
      p {
        font-family: 'Archivo Black', serif;
        color: white;
        font-size: 0.75rem;
      }
      .weather-widget {
        /* Changed to relative positioning so the widget flows with the layout */
        // position: relative;
        display: flex;
        padding-left: 5px;
        margin-top: auto;
        margin-bottom: auto;
        z-index: 2;
      }
      .weather-icon {
        width: 20px;
        height: 20px;
      }
      .temperature {
        color: white;
        font-size: 12px;
        font-family: 'Archivo Black', serif;
        line-height: 20px;
      }
    `,
  ],
})
export class WeatherComponent implements OnInit {
  // Holds the current temperature in Fahrenheit (rounded integer)
  temperature: number | null = null;
  // Holds the weather condition code from the API
  weatherCode: number | null = null;
  // Holds the URL for the weather icon from a public CDN
  iconUrl: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Open‑Meteo API for Chicago, IL (latitude: 41.8781, longitude: -87.6298)
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=41.8781&longitude=-87.6298&current_weather=true&temperature_unit=fahrenheit';
    this.http.get<any>(url).subscribe({
      next: (data) => {
        if (
          data &&
          data.current_weather &&
          data.current_weather.temperature !== undefined
        ) {
          // Round the temperature for display
          this.temperature = Math.round(data.current_weather.temperature);
          // If available, use the weather code to set the appropriate icon
          if (data.current_weather.weathercode !== undefined) {
            this.weatherCode = data.current_weather.weathercode;
            this.iconUrl = this.getIconUrl(this.weatherCode!);
          }
        }
      },
      error: (err) => {
        console.error('Error fetching weather data:', err);
      },
    });
  }

  /**
   * Returns an icon URL based on the Open-Meteo weather code.
   * This mapping uses icons from OpenWeatherMap’s public CDN.
   */
  private getIconUrl(weatherCode: number): string {
    // Clear sky
    if (weatherCode === 0) {
      return 'https://openweathermap.org/img/wn/01d@2x.png';
    }
    // Mainly clear, partly cloudy, overcast
    else if ([1, 2, 3].includes(weatherCode)) {
      return 'https://openweathermap.org/img/wn/02d@2x.png';
    }
    // Fog and depositing rime fog
    else if ([45, 48].includes(weatherCode)) {
      return 'https://openweathermap.org/img/wn/50d@2x.png';
    }
    // Drizzle (light to moderate) and freezing drizzle
    else if ([51, 53, 55, 56, 57].includes(weatherCode)) {
      return 'https://openweathermap.org/img/wn/09d@2x.png';
    }
    // Rain (moderate to heavy) and freezing rain or rain showers
    else if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
      return 'https://openweathermap.org/img/wn/10d@2x.png';
    }
    // Snow fall, snow grains, or snow showers
    else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
      return 'https://openweathermap.org/img/wn/13d@2x.png';
    }
    // Thunderstorm (with or without hail)
    else if ([95, 96, 99].includes(weatherCode)) {
      return 'https://openweathermap.org/img/wn/11d@2x.png';
    }
    // Default fallback icon
    return 'https://openweathermap.org/img/wn/01d@2x.png';
  }
}
