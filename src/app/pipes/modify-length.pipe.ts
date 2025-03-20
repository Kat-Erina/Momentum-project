import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modifyLength'
})
export class ModifyLengthPipe implements PipeTransform {

  transform(value: string, maxLength:number=100): string {
     if (!value) return ''
     return value.length > maxLength ? value.slice(0, maxLength) + '...' : value;
  }

}
