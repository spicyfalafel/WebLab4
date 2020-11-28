import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoginService {

    private URL = 'http://localhost:8080/api/users/';

    constructor(private httpClient: HttpClient) {
    }

    logIn(user: User): Observable<any> {
        const base64Credentials = btoa(user.username + ':' + user.password);
        const headers: HttpHeaders = new HttpHeaders();
        headers.set('Accept', 'application/json');
        headers.set('Authorization', 'Basic ' + base64Credentials);
        return this.httpClient.get(this.URL + 'login', {headers: headers});
    }

    logOut(): void {
        localStorage.removeItem('currentUser');
        this.httpClient.get(this.URL + 'logout').subscribe();
    }
}
