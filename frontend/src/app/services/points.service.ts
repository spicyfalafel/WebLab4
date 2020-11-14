import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Point} from '../models/Point';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PointsService {

    private URL = '';
    private TEST_URL='assets/points.json';

    constructor(private httpClient: HttpClient) {
    }

    getAllPoints(): Observable<any> {
        return this.httpClient.get(this.TEST_URL);
    }

    addPoint(point: Point): void {
        this.httpClient.post(JSON.stringify(point), this.URL);
    }
}

