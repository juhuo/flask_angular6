import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  httpOptions = {
  /*
     headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'Authorization':'authkey',
        'userid':'1'
     })
     */
  };

  url = "https://fcc-weather-api.glitch.me/api/current?lon=0.0&lat=0.0";
  orig_url = "http://samples.openweathermap.org/data/2.5/history/city?q=Warren,OH&appid=b6907d289e10d714a6e88b30761fae22";
  callbackUrl = "https://samples.openweathermap.org";
  // /data/2.5/history/city?q=Warren,OH&appid=b6907d289e10d714a6e88b30761fae22&=callback?";

  /*
  dailyForecast() {
    return this._http.get(this.url, this.httpOptions).pipe( map(result => result));
  }
  */

  // with proxy.conf.json
  // ng serve --proxy-config=proxy.conf.json

  dataUrl = "http://127.0.0.1:8000/data";
  proxyUrl = "/api/data/2.5/history/city?q=Warren,OH&appid=b6907d289e10d714a6e88b30761fae22";
  dailyForecast() {
		return this._http.get(this.dataUrl).pipe( map(result => result));
		}
}
