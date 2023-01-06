import { AbstractControl } from '@angular/forms';

export class MathValidators {
  static addition(target: string, source1: string, source2: string) {
    return (form: AbstractControl) => {
      const sum = form.value[target];
      const firstNumber = form.value[source1];
      const secondNUmber = form.value[source2];
      if (firstNumber + secondNUmber === parseInt(sum)) {
        return null;
      }
      return { addition: true };
    };
  }
}
