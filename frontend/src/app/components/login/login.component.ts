import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  userToAuth: User = new User(0, '', '');
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService) {
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

  hasFormErrors(): boolean{
    return this.loginForm.invalid;
  }

  onSingInClick(): void{
    this.loginService.logIn(this.userToAuth);
    // todo redirect to main if it's ok
  }
}
