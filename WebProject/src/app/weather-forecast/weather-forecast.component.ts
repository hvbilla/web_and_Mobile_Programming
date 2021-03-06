import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  constructor(private http: HttpClient, private toastrService: ToastrService) {
  }
  ngOnInit() {
  }

  title = 'Lab2Assignment';
  weatherData = null;
  requiredWeatherData = null;
  zipCode = '';
  cityId = '';

  getDetails() {
    if (this.zipCode === '' && this.cityId === '') {
      this.requiredWeatherData = null;
      this.toastrService.error('Please enter any of the details');
      return;
    }

    if (this.zipCode !== '' && this.zipCode.length !== 5 && this.cityId === '') {
      this.requiredWeatherData = null;
      this.toastrService.warning('Zip code must be five digits only');
      return;
    }
    if (this.cityId !== '' && this.cityId.length !== 6 && this.zipCode === '') {
      this.requiredWeatherData = null;
      this.toastrService.warning('City id must be six digits only');
      return;
    }

    const apiURL = this.zipCode ?
        'https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/forecast/hourly?zip='
        + this.zipCode + '&appid=b6907d289e10d714a6e88b30761fae22' :
        'https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/forecast/hourly?id='
        + this.cityId + '&appid=b6907d289e10d714a6e88b30761fae22';

    this.http.get(apiURL).subscribe(data => {
      this.weatherData = data;
      this.requiredWeatherData = this.weatherData.list.slice(0,5);
    });
  }
  clearDetails() {
    this.zipCode = '';
    this.cityId = '';
    this.requiredWeatherData = null;
  }
}
