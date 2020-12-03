import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private URL: string = 'http://localhost:9000/';

    constructor(private httpClient: HttpClient) {
    }

    register(user: User): Observable<any> {
        return this.httpClient.post(this.URL + 'register', JSON.stringify(user),
            {headers: new HttpHeaders().set("Content-Type", "application/json")});
    }
}
