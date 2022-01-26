import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
   let firstLetter = value.substring(0,1).toUpperCase();
    
    return firstLetter;
  }

}
