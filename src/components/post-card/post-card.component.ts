import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/post/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.sass']
})
export class PostCardComponent implements OnInit {
  @Input() postToDisplay: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
