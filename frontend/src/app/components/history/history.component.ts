import {Component, OnInit} from '@angular/core';
import {PointsService} from '../../services/points.service';
import {Point} from '../../models/Point';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {

    points: Point[];
    columns: any[] = [
        {field: 'x', header: 'X'},
        {field: 'y', header: 'Y'},
        {field: 'r', header: 'R'},
        {field: 'result', header: 'Result'}
    ];

    constructor(private pointsService: PointsService) {
    }

    ngOnInit(): void {
        this.pointsService.getAllPoints().subscribe((points: Point[]) => this.points = points);
    }
}
