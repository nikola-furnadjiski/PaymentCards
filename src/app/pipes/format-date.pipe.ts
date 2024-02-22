import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  transform(value: any): any {
    if (!value) return value; // If value is falsy, return it as is

    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, 'MM/yy');
  }
}
