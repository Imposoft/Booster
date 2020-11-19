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
      imgUrl: 'Aquí iría la imagen del feedd1?',
      owner: undefined,
      promoted: false,
      title: 'Titulo de Publicación 1'};
    this.postTwo = {body: ' Me llamo Juana es una música muy poco profesional y la verdad que no aconsejo contratarta..cuerpo del feed 2......',
      exclusive: false,
      imgUrl: 'Aquí iría la imagen del feed2',
      owner: undefined,
      promoted: false,
      title: 'Titulo de Publicación 2'};
    this.postList.push(this.postOne, this.postTwo);
  }

  ngOnInit(): void {
  }

}
