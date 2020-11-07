import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {Tutorial} from '../../models/tutorial/tutorial.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.view.html',
  styleUrls: ['./post.view.sass']
})
export class PostView implements OnInit {

  modificationForm: FormGroup;

  private _success = new Subject<string>();
  successMessage = '';

  constructor() { }

  ngOnInit(): void {
  }

  sendForm(): void {
  }
}
