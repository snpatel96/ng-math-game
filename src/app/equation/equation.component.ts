import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MathValidators } from '../math-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  mathForm = new FormGroup(
    {
      firstValue: new FormControl(this.randomNumber()),
      secondValue: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [MathValidators.addition('answer', 'firstValue', 'secondValue')]
  );

  get firstValue() {
    return this.mathForm.value.firstValue;
  }

  get secondValue() {
    return this.mathForm.value.secondValue;
  }

  ngOnInit() {
    this.mathForm.statusChanges.subscribe((value) => console.log(value));
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
