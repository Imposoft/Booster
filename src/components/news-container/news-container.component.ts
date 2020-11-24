import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Post} from '../../models/post/post.model';

@Component({
  selector: 'app-news-container',
  templateUrl: './news-container.component.html',
  styleUrls: ['./news-container.component.sass']
})
export class NewsContainerComponent implements OnInit {
  @Input() classInput: Post;
  classToCheck: Post;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  removeNews(): void { }

  share(): void { }
}
