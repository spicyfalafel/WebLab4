import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Point} from '../models/Point';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PointsService {

    private URL = 'http://localhost:9000/api/users/';
    private TEST_URL = 'assets/points.json';
    private currentUser = JSON.parse(localStorage.getItem('currentUser'));
    private httpOptions = {
        headers: new HttpHeaders({
            'Authorization': 'Basic ' + localStorage.getItem('basic64Credentials'),
            'Content-Type': 'application/json'
        })
    };


    constructor(private httpClient: HttpClient) {
    }

    getAllPoints(): Observable<any> {
        return this.httpClient.get(`${this.URL}${this.currentUser.id}/points/`, this.httpOptions);
    }

    addPoint(point: Point): Observable<any> {
        return this.httpClient
            .post(`${this.URL}${this.currentUser.id}/points/`, JSON.stringify(point), this.httpOptions);
    }

    removeAllPoints(): void {

    }
}

