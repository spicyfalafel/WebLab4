import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {PointsService} from '../../services/points.service';
import {DrawService} from '../../services/draw.service';
import {Point} from '../../models/Point';

@Component({
    selector: 'app-check-point',
    templateUrl: './check-point.component.html'
})
export class CheckPointComponent implements OnInit, AfterViewInit {

    @ViewChild('plot', {static: false})
    plot: ElementRef;

    x: string;
    y: string;
    r: string;
    dataForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private pointsService: PointsService,
                private drawService: DrawService) {
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
        return fieldState.dirty && fieldState.errors ? fieldState.errors : null;
    }

    onSubmitClick(): void {
        console.log('x = ' + this.x);
        console.log('y = ' + this.y);
        console.log('r = ' + this.r);
    }

    onRRadioClick(): void {
        this.drawService.clearPlot(this.plot);
        this.drawAllPoints();
    }

    onClearFormClick(): void {

    }

    onClearTableClick(): void {

    }

    ngAfterViewInit(): void {
        this.drawAllPoints();
    }

    drawAllPoints(): void {
        this.pointsService
            .getAllPoints()
            .subscribe((data: Point[]) => data.forEach(point =>
                this.drawService.drawPoint(point, this.plot, this.r)));
    }
}

