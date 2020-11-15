import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PointsService} from '../../services/points.service';
import {Point} from '../../models/Point';
import {Table} from 'primeng/table';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {

    @ViewChild('dataTable', {static: false})
    dataTable: Table;

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
