import {Pipe, PipeTransform} from '@angular/core';
import { DropDownLists } from './select-models';
@Pipe({
  name: 'NgLimitCountFilter'
})
export class NgLimitCountFilter implements PipeTransform {

  transform(options: Array<DropDownLists>, value: string): any {
    const data =  options.filter((val: DropDownLists) => val.label.toLowerCase().includes(value));
    return data.length ? data : [{id: null, label: 'No Result Found!'}];
  }

}