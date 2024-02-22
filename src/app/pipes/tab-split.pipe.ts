import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tabSplit'
})
export class TabSplitPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value; // If value is falsy, return it as is

    // Split the string into chunks of four characters and join them with a tab character
    return value.replace(/(.{4})/g, '$1      ').trim();
  }
}
