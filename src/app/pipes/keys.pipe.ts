import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'objectValues', pure: false })
export class ObjectValuesPipe implements PipeTransform {
  transform(value: any): any[] {
    if (!value) {
      return []; // or throw an error, depending on your requirements
    }
    return Object.values(value);
  }
}