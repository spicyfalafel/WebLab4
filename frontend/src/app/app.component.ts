import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    // todo validators
    x: string;
    y: string;
    r: string;

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
