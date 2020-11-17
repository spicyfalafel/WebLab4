import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';

@Injectable({providedIn: 'root'})
export class LoginService {

    private URL = '';

    constructor(private httpClient: HttpClient) {
    }

    logIn(user: User): boolean {
        // todo
        // some headers
        // request get?
        // set attributes in localstorage after login
        return true;
    }

    logOut(): void {
        // todo
        // clear localstorage
        // send logout request
    }
}

