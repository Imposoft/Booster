import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/post/post.model";

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.sass']
})
export class PostFeedComponent implements OnInit {

  public postList: Post[];
  public postOne: Post;
  constructor() {  this.postOne= {body: "", exclusive: false, imgUrl: "", owner: undefined, promoted: false, title: ""}; }

  ngOnInit(): void {
  }

}
