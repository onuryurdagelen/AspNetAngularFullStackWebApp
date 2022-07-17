import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vatAdded'
})
export class VatAddedPipe implements PipeTransform {

  //value ==> değiştirilmek istenen veridir.
  transform(value: number, rate:number): number {
    return value + value * (rate / 100);
  }

}
