import { Component, OnInit } from '@angular/core';
import {Post} from '../../models/post/post.model';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.sass']
})
export class PostFeedComponent implements OnInit {
  public postList: Post[];
  public postOne: Post;
  public postTwo: Post;

  constructor() {
    this.postList = [];
    this.postOne = {body: 'Me llamo Juana es una música estupenda y la verdad es que aconsejo a todos contratarla....cuerpo del feed1',
      exclusive: false,
      imgUrl: 'https://firebasestorage.googleapis.com/v0/b/booster-dceeb.appspot.com/o/temp%2Fviolinista--644x362.jpg?alt=media&token=dcaeb0db-6f5e-4472-875b-3dd77de70c08',
      owner: undefined,
      promoted: true,
      title: 'Titulo de Publicación 1',
      creation: ''};
    this.postTwo = {body: ' Me llamo Juana es una música muy poco profesional y la verdad que no aconsejo contratarta..cuerpo del feed 2......',
      exclusive: false,
      imgUrl: 'https://firebasestorage.googleapis.com/v0/b/booster-dceeb.appspot.com/o/temp%2Fbisbal.png?alt=media&token=d34d3ee8-1f87-4ee0-8a94-ca939e67310a',
      owner: undefined,
      promoted: false,
      title: 'Titulo de Publicación 2',
      creation: ''};
    this.postList.push(this.postOne, this.postTwo);
  }

  ngOnInit(): void {
  }

}
