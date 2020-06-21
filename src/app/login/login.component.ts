import { Router } from '@angular/router';
import { User } from './../models/user';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomvalidationService } from '../validators/password-pattern.validator';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private customValidator: CustomvalidationService,
    private authenticated: AuthenticateService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: [
        '',
        [Validators.required, this.customValidator.patternValidator()],
      ],
    });
  }
  login(user: User) {
    this.authenticated.login(user).subscribe((val) => {
      if (val) {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigateByUrl('dashboard');
      } else {
        alert('Wrong credential entered,try again');
      }
    });
  }
}
