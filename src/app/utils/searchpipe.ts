import {Pipe , PipeTransform, Injectable} from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
@Injectable()
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      if (it.searchTerm) {
        return it.searchTerm.toLowerCase().includes(searchText);
      } else {
        return it;
      }
    });
  }
}
