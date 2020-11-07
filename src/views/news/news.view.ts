import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {Post} from '../../models/post/post.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.view.html',
  styleUrls: ['./news.view.sass']
})
export class NewsView implements OnInit {
  posts;
  modificationForm: FormGroup;

  checked = false;
  indeterminate = false;

  private _success = new Subject<string>();
  successMessage = '';

  constructor(private formBuilder: FormBuilder, private afs: AngularFirestore) {
    this.posts = afs.collection<Post>('posts');
  }

  ngOnInit(): void {
  }

  sendForm(): void {
  }
}
