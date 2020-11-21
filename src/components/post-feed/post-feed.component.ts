import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/post/post.model';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.sass']
})
export class PostFeedComponent implements OnInit {
  @Input() postList: Post[];
  @Input() userLoggedId: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
