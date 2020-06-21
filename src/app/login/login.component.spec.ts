import { AuthenticateService } from './../services/authenticate.service';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { routes } from './../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Observable } from 'rxjs';
import { User } from '../models/user';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authService: AuthServiceStub;
  let router: Router;
  let fixture: ComponentFixture<LoginComponent>;

  class AuthServiceStub {
    login(user: User): Observable<boolean> {
      if (user.password === 'V@12345jain') {
        return of(true);
      }
      return of(false);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, DashboardComponent],
      imports: [RouterTestingModule.withRoutes(routes), ReactiveFormsModule],
      providers: [{ provide: AuthenticateService, useClass: AuthServiceStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    authService = TestBed.get(AuthenticateService);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should contain formControls username and password', () => {
    expect(component.loginForm.controls['username']).toBeDefined();
    expect(component.loginForm.controls['password']).toBeDefined();
  });

  it('formcontrol username is required and is not valid if left empty', () => {
    component.loginForm.controls['username'].setValue('');
    component.loginForm.controls['username'].markAsTouched();
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('formcontrol password is required and follows regex and is not valid if left empty or doesnot follow regex', () => {
    component.loginForm.controls['password'].setValue('');
    component.loginForm.controls['password'].markAsTouched();
    expect(component.loginForm.valid).toBeFalsy();

    component.loginForm.controls['password'].setValue('V123');
    component.loginForm.controls['password'].markAsDirty();
    expect(
      component.loginForm.controls['password'].errors.invalidPassword
    ).toBeTruthy();
  });

  it('authenticating login via authentication service and navigating to dashboard', () => {
    component.loginForm.controls['password'].setValue('V@12345jain');
    component.loginForm.controls['username'].setValue('Vaishali');
    const spyAuth = spyOn(authService, 'login').and.callThrough();
    const spyRoute = spyOn(router, 'navigateByUrl').and.stub();
    component.login(component.loginForm.value);
    expect(spyAuth).toHaveBeenCalled();
    expect(spyRoute).toHaveBeenCalledWith('dashboard');
  });

  it('should give alert when non-authenticated user login', () => {
    component.loginForm.controls['password'].setValue('V@12345gupta');
    component.loginForm.controls['username'].setValue('Vaishali');
    spyOn(window, 'alert');
    component.login(component.loginForm.value);
    expect(window.alert).toHaveBeenCalledWith(
      'Wrong credential entered,try again'
    );
  });
});
