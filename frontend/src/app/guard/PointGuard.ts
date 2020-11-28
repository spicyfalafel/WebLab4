import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class PointGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const isAuth: boolean = localStorage.getItem('currentUser') !== null;

        if (!isAuth && state.url.match(/\/(home)$/gi)) {
            this.router.navigate(['/login']);
            return false;
        }

        if (isAuth && state.url.match(/\/(login|register)$/gi)) {
            // todo something like profile?
            this.router.navigate(['/home']);
            return false;
        }

        return true;
    }
}
