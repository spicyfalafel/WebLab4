import {Component} from '@angular/core';
import {User} from '../../models/User';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})

export class HomeComponent {

    isVisibleSideBar: boolean = false;
    currentUser: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private loginService: LoginService, private router: Router) {
    }

    onLogOutClick(): void {
        this.loginService.logOut();
        this.router.navigate(['/login']);
    }
}
