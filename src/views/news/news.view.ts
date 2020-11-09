import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {Post} from '../../models/post/post.model';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-news',
  templateUrl: './news.view.html',
  styleUrls: ['./news.view.sass']
})
export class NewsView implements OnInit {
  news;
  modificationForm: FormGroup;
  exclusive = false;
  promoted = false;

  private _success = new Subject<string>();
  successMessage = '';

  constructor(private formBuilder: FormBuilder, private afs: AngularFirestore) {
    this.news = afs.collection<Post>('posts');
  }

  ngOnInit(): void {
    this.modificationForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      imgUrl: ['', [Validators.required]],
      body: ['', []],
      exclusive: ['', [Validators.required]],
      promoted: ['', [Validators.required]],
      owner: null,
    });
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(2500)
    ).subscribe(() => this.successMessage = '');
  }

  sendForm(): void {
    const post = {
      title: this.modificationForm.value.title,
      imgUrl: this.modificationForm.value.imageUrl,
      body: this.modificationForm.value.description,
      exclusive: this.modificationForm.value.exclusive,
      promoted: this.modificationForm.value.promoted,
      owner: null,
    };
    this.news.add(post);
    this._success.next('Noticia creada con exito!');
  }

  removeNew(): void {

  }
}
