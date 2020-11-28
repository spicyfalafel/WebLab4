import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {User} from '../../models/User';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['../common/shared.style.css']
})
export class LoginComponent implements OnInit {

    userToAuth: User = new User(0, '', '');
    loginForm: FormGroup;
    isFailedAuth: boolean = false;

    constructor(private formBuilder: FormBuilder,
                private loginService: LoginService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
            password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
        });
    }

    fieldErrors(field: string): ValidationErrors | null {
        let fieldState = this.loginForm.controls[field];
        return fieldState.dirty && fieldState.errors ? fieldState.errors : null;
    }

    hasFormErrors(): boolean {
        return this.loginForm.invalid;
    }

    onSingInClick(): void {
        // todo fix it if need
        this.loginService.logIn(this.userToAuth).subscribe((response: Response) => {
                const currentUser = response.json()['principal'];
                if (currentUser) {
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    this.router.navigate(['/home']);
                }
            }, error => this.isFailedAuth = true
        );
    }
}
