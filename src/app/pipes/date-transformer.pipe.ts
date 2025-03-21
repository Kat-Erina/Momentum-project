import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTransformer'
})
export class DateTransformerPipe implements PipeTransform {

  transform(value:string): string {
    if (!value) return '';

    const date = new Date(value);
    const days = ["კვი", "ორშ","სამ", "ოთხ", "ხუთ", "პარ", "შაბ", "კვი"];
  const dayName = days[date.getDay()];
  const day = date.getDate().toString().padStart(2, '0'); // Ensures two-digit format
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return `${dayName} - ${day}/${month}/${year}`;
  }

}
