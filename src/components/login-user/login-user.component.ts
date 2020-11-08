import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.sass']
})
export class LoginUserComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  logIn(): void {
    this.auth
      .signInWithEmailAndPassword(this.registrationForm.value.email, this.registrationForm.value.password)
      .then(value => {
        console.log(value.user.photoURL);
        console.log(value.user.uid);
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }
}
