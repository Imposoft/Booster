import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.view.html',
  styleUrls: ['./register.view.sass']
})
export class RegisterView implements OnInit {
  public showingLogin: boolean;

  constructor() { }

  ngOnInit(): void {
    this.showingLogin = true;
  }

  toggleLogin(): void{
    this.showingLogin = !this.showingLogin;
  }

}
