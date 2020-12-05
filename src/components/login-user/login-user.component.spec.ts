import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import { LoginUserComponent } from './login-user.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {auth} from 'firebase';
import {DebugElement} from '@angular/core';



describe('LoginUserComponent', () => {
  let component: LoginUserComponent;
  let fixture: ComponentFixture<LoginUserComponent>;


  const formBuilder: FormBuilder = new FormBuilder();


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginUserComponent ],
      imports: [ ReactiveFormsModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('created a form with email and password input and login button', () => {
    const emailContainer = fixture.debugElement.nativeElement.querySelector('#emailInput');
    const passworContainer = fixture.debugElement.nativeElement.querySelector('#passwordInput');
    const loginButtonContainer = fixture.debugElement.nativeElement.querySelector('#login');

    expect(emailContainer).toBeDefined();
    expect(passworContainer).toBeDefined();
    expect(loginButtonContainer).toBeDefined();
  });

  it('should validate correct user and password', () => {
      component.registrationForm = formBuilder.group({
        email: 'test@test.com',
        password: '123456'
      });
      fixture.nativeElement.querySelector('button').click();

      expect(component.logIn()).toHaveBeenCalled();
  });

  it('should deny access with incorrect password', () => {
    component.registrationForm = formBuilder.group({
      email: 'test@test.com',
      password: '123'
    });
    fixture.nativeElement.querySelector('button').click();

    expect(component.errorMessage).toEqual('Error al iniciar sesion. Email y/o contraseña incorrecto/s ');
  });


});
