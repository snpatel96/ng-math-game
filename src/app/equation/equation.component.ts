import { Component } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent {
  mathForm = new FormGroup(
    {
      firstValue: new FormControl(this.randomNumber()),
      secondValue: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [
      (form: AbstractControl) => {
        const { firstValue, secondValue, answer } = form.value;
        if (firstValue + secondValue === parseInt(answer)) {
          return null;
        }
        return { addition: true };
      },
    ]
  );

  get firstValue() {
    return this.mathForm.value.firstValue;
  }

  get secondValue() {
    return this.mathForm.value.secondValue;
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
