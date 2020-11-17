import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {RegisterService} from '../../services/register.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

    userToRegister: User = new User(0, '', '');
    repeatedPassword: string;
    registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private registerService: RegisterService) {
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.maxLength(20),
                Validators.minLength(4), Validators.pattern(/[A-Za-z0-9_]{4,20}/)]],
            password: ['', [Validators.required, Validators.maxLength(20),
                Validators.minLength(4), Validators.pattern(/[a-z]+/),
                Validators.pattern(/[A-Z]+/), Validators.pattern(/\d+/), Validators.pattern(/[A-Za-z0-9_]{4,20}/)]],
            repeatedPassword: ['']
        });
    }

    // match passwords
    // custom validators has many bugs(
    repeatedPasswordMatch(): boolean{
        return this.userToRegister.password !== this.repeatedPassword;
    }

    hasFormErrors(): boolean {
        return this.registerForm.invalid;
    }

    fieldErrors(field: string): ValidationErrors | null {
        let fieldState = this.registerForm.controls[field];
        return fieldState.dirty && fieldState.errors ? fieldState.errors : null;
    }

    onSignUpClick(): void {
        // todo send user
    }
}
