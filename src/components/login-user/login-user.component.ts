import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.sass']
})
export class LoginUserComponent implements OnInit {
  registrationForm: FormGroup;
  private _error = new Subject<string>();
  public errorMessage = '';
  hide: boolean = true;

  constructor(private fb: FormBuilder, public auth: AngularFireAuth, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this._error.subscribe(message => this.errorMessage = message);
    this._error.pipe(
      debounceTime(3500)
    ).subscribe(() => this.errorMessage = '');
  }

  logIn(): void {
    this.auth
      .signInWithEmailAndPassword(this.registrationForm.value.email, this.registrationForm.value.password)
      .then(value => {
        console.log(value.user.photoURL);
        console.log(value.user.uid);
        console.log('Nice, it worked!');
        this.changeView();
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this._error.next('Error al iniciar sesion. Email y/o contraseña incorrecto/s ');
      });
  }

  changeView(): void {
    this.router.navigate(['home']);
  }

  toggleFieldTextType(): void {
    this.hide = !this.hide;
  }
}
