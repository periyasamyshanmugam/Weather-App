import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  constructor(public http: Http) { }

  getData() {
    return this.http.get('http://api.openweathermap.org/data/2.5/group?id=1273294,1275339,1275004,1264527,1277333,1269843&&APPID=b0d75ffbe501be071ae9a1760a8a9edd&&&units=metric');
  }
  getCityData(id: any) {
    return this.http.get('http://api.openweathermap.org/data/2.5/forecast?id=' + id + '&&APPID=b0d75ffbe501be071ae9a1760a8a9edd&&&units=metric');
  }
}
