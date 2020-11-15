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
    this.postOne = {body: '',
      exclusive: false,
      imgUrl: '',
      owner: undefined,
      promoted: false,
      title: ''};
    this.postTwo = {body: '',
      exclusive: false,
      imgUrl: '',
      owner: undefined,
      promoted: false,
      title: ''};
    this.postList.push(this.postOne, this.postTwo);
  }

  ngOnInit(): void {
  }

}
