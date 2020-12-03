import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import {Observable} from 'rxjs';
import {NetworkUtil} from '../utils/NetworkUtil';

@Injectable({providedIn: 'root'})
export class LoginService {

    constructor(private httpClient: HttpClient) {
    }

    logIn(user: User): Observable<any> {
        const base64Credentials = btoa(user.login + ':' + user.hashPass);
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Basic ' + base64Credentials
            })
        };
        return this.httpClient.get(NetworkUtil.USERS_URL, httpOptions);
    }

    logOut(): void {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('basic64Credentials')
        // this.httpClient.get(this.URL + 'logout').subscribe();
    }
}

