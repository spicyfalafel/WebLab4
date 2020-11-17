import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private URL: string = '';

    constructor(private httpClient: HttpClient) {
    }

    register(user: User): Observable<any> {
        // todo post request and return something
        // redirect to login page or log in automatically?
        return null;
    }
}
