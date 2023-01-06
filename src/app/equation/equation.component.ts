import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { delay, filter, scan } from 'rxjs/operators';
import { MathValidators } from '../math-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  secondsperSolution = 0;
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
    this.mathForm.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        delay(200),
        scan(
          (acc) => {
            return {
              numberSolved: acc.numberSolved + 1,
              startTime: acc.startTime,
            };
          },
          { numberSolved: 0, startTime: new Date() }
        )
      )
      .subscribe(({ numberSolved, startTime }) => {
        this.secondsperSolution =
          (new Date().getTime() - startTime.getTime()) / numberSolved / 1000;
        this.mathForm.setValue({
          firstValue: this.randomNumber(),
          secondValue: this.randomNumber(),
          answer: '',
        });
      });
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
