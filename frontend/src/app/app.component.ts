import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    // todo validators
    // todo check strange error when it starts
    // todo routing
    x: string;
    y: string;
    r: string;
    dataForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.dataForm = this.formBuilder.group({
            xValue: ['', [Validators.required]],
            yValue: ['', [Validators.required, this.yInBoundsValidator]],
            rValue: ['', [Validators.required]]
        });
    }

    // custom validator
    yInBoundsValidator(formControl: FormControl): { [s: string]: boolean } {
        const yValue = parseFloat(formControl.value);
        if (formControl.value === '' ||
            !isNaN(yValue) && yValue <= 3 && yValue >= -3 && /^(-?\d+)(\.\d+)?$/.test(formControl.value)) {
            return null;
        }
        return {'yOutOfBounds': true};
    }

    hasFormErrors(): boolean {
        return this.dataForm.invalid;
    }

    fieldErrors(field: string): ValidationErrors | null {
        let fieldState = this.dataForm.controls[field];
        console.log(fieldState.errors);
        return fieldState.dirty && fieldState.errors ? fieldState.errors : null;
    }

    onSubmitClick(): void {
        console.log('x = ' + this.x);
        console.log('y = ' + this.y);
        console.log('r = ' + this.r);
    }

    onClearFormClick(): void {

    }

    onClearTableClick(): void {

    }
}
