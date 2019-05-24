import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  sortName: string | null = null;
  sortValue: string | null = null;
  searchAddress: string;
  listOfName = [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }];
  listOfAddress = [{ text: 'London', value: 'London' }, { text: 'Sidney', value: 'Sidney' }];
  listOfSearchName: string[] = [];
  listOfData = [];
  listOfDisplayData = [];

  constructor(private myservice: MyserviceService, public route: Router) { }

  ngOnInit() {
    this.myservice.getData().subscribe((res: any) => {
      res = res.json();
      const tempList = res.list;
      this.listOfData = [];
      this.listOfDisplayData = [];
      _.forEach(tempList, (each: any) => {
        this.listOfData.push({
          c_name: each.name,
          weather: each.weather && each.weather.length && each.weather[0].description ? each.weather[0].description : '-',
          sun_rise: each.sys.sunrise,
          sun_set: each.sys.sunset,
          temp: each.main.temp,
          id: each.id,
          searchTerm: each.name
        });
      });
      this.listOfData = _.sortBy(this.listOfData, 'c_name');
      this.listOfDisplayData = [...this.listOfData];
    });
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
  onclickFun(data) {
    this.route.navigate(['/city-data'], { queryParams: { id: data.id } });
  }
}
