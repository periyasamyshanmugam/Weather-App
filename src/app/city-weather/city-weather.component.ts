import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.css']
})
export class CityWeatherComponent implements OnInit {
  id;
  listOfData = [];
  listOfDisplayData = [];
  sortName: string | null = null;
  sortValue: string | null = null;
  searchAddress: string;
  listOfName = [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }];
  listOfAddress = [{ text: 'London', value: 'London' }, { text: 'Sidney', value: 'Sidney' }];
  listOfSearchName: string[] = [];
  cityName;

  constructor(private myservice: MyserviceService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.id = JSON.parse(queryParams['id']);
    });
    if (this.id) {
      this.myservice.getCityData(this.id).subscribe((res: any) => {
        res = res.json();
        this.cityName = res.city.name;
        const tempList = res.list;
        this.listOfData = [];
        this.listOfDisplayData = [];
        _.forEach(tempList, (each: any) => {
          this.listOfData.push({
            date: each.dt_txt,
            weather: each.weather && each.weather.length && each.weather[0].description ? each.weather[0].description : '-',
            pressure: each.main.pressure,
            temp: each.main.temp
          });
        });
        this.listOfDisplayData = [...this.listOfData];
      });
    } else {
      this.router.navigate(['/']);
    }
  }
  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  filter(listOfSearchName: string[], searchAddress: string): void {
    this.listOfSearchName = listOfSearchName;
    this.searchAddress = searchAddress;
    this.search();
  }

  search(): void {
    /** filter data **/
    const filterFunc = (item: { name: string; age: number; address: string }) =>
      (this.searchAddress ? item.address.indexOf(this.searchAddress) !== -1 : true) &&
      (this.listOfSearchName.length ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1) : true);
    const data = this.listOfData.filter(item => filterFunc(item));
    /** sort data **/
    if (this.sortName && this.sortValue) {
      const sName = this.sortName;
      const sValue = this.sortValue;
      this.listOfDisplayData = data.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[sName!] > b[sName!]
            ? 1
            : -1
          : b[sName!] > a[sName!]
          ? 1
          : -1
      );
    } else {
      this.listOfDisplayData = data;
    }
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
