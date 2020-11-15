import {ElementRef, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {Point} from '../models/Point';

@Injectable({providedIn: 'root'})
export class DrawService {

    private readonly CANVAS_WIDTH = 300;
    private readonly CANVAS_HEIGHT = 300;
    private readonly CANVAS_R_VALUE = 120;
    private readonly DEFAULT_R_VALUE = 3;

    private renderer: Renderer2;

    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    drawPoint(point: Point, plot: ElementRef, rFromCheckComponent: string): void {
        plot.nativeElement.innerHTML +=
            `<circle class="point" r="4" cx="${this.fromTableToSvgX(point.x, this.getRValue(rFromCheckComponent))}" 
             cy="${this.fromTableToSvgY(point.y, this.getRValue(rFromCheckComponent))}" fill="${this.getColorByResult(point.result)}"></circle>`;
    }

    clearPlot(plot: ElementRef) {
        const points = plot.nativeElement.querySelectorAll('.point');
        points.forEach(point => this.renderer.removeChild(plot.nativeElement, point));
    }

    private getRValue(rFromCheckComponent: string): number {
        let rValue = parseFloat(rFromCheckComponent);
        // fixme if after sending point r will reset
        if (isNaN(rValue)) {
            rValue = this.DEFAULT_R_VALUE;
        }
        return rValue;
    }

    private fromTableToSvgX(x: number, r: number): number {
        return x / r * this.CANVAS_R_VALUE + this.CANVAS_WIDTH / 2;
    }

    private fromTableToSvgY(y: number, r: number): number {
        return this.CANVAS_HEIGHT / 2 - y / r * this.CANVAS_R_VALUE;
    }

    private fromSvgToRX(x: number, r: number): number {
        return r * (x - this.CANVAS_WIDTH / 2) / this.CANVAS_R_VALUE;
    }

    private fromSvgToRY(y: number, r: number): number {
        return r * (this.CANVAS_HEIGHT / 2 - y) / this.CANVAS_R_VALUE;
    }

    private getColorByResult(result: boolean): string {
        return result ? 'green' : 'red';
    }
}
