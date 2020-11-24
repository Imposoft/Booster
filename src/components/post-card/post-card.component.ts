import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/post/post.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.sass']
})
export class PostCardComponent implements OnInit {
  @Input() postToDisplay: Post;
  @Input() isOwner: boolean;
  public firestore: AngularFirestore;
  public likes: number;
  public dislikes: number;

  constructor(firestore: AngularFirestore, private router: Router) {
    this.firestore = firestore;
  }

  ngOnInit(): void {
    this.likes = this.numberLikes();
    this.dislikes = this.numberDislikes();
  }

  delete(): void {
    this.firestore.collection('posts').doc(this.postToDisplay.id).delete();
  }

  modifyPost(): void{
    this.router.navigate(['news/' + this.postToDisplay.id]);
  }

  like(): void {
    this.likes = this.likes + 1;
  }

  dislike(): void {
    this.likes = this.dislikes + 1;
  }

  numberLikes(): number {
    return 7342;
  }

  numberDislikes(): number {
    return 1230;
  }


  /*userLoggedIsProfileOwner(): boolean {
    return this.loggedId === this.pathId;
  }*/
}
