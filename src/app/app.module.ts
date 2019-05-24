import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { CityWeatherComponent } from './city-weather/city-weather.component';

/** config angular i18n **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';
import { CityListComponent } from './city-list/city-list.component';
import { SearchFilterPipe } from '../app/utils/searchpipe';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CityWeatherComponent,
    CityListComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    /** import ng-zorro-antd root module，you should import NgZorroAntdModule and avoid importing sub modules directly **/
    NgZorroAntdModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
         path: '',
         component: CityListComponent
      },
      {
        path: 'city-data',
        component: CityWeatherComponent
     }
   ])
  ],
  bootstrap: [ AppComponent ],
  /** config ng-zorro-antd i18n (language && date) **/
  providers   : [
    { provide: NZ_I18N, useValue: en_US }
  ]
})
export class AppModule { }