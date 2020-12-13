import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/post/post.model';
import {AngularFirestore, AngularFirestoreCollection, CollectionReference} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import DocumentData = firebase.firestore.DocumentData;

import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.sass']
})
export class PostCardComponent implements OnInit {
  @Input() postToDisplay: Post;
  @Input() isOwner: boolean;
  public firestore: AngularFirestore;
  public likes: any = 0;
  public dislikes: any = 0;
  public variable: string;
  public likesCollection: AngularFirestoreCollection<DocumentData>;
  public dislikesCollection: AngularFirestoreCollection<DocumentData>;
  public loggedId: string;
  public existsUserRating: boolean;

  constructor(firestore: AngularFirestore, private router: Router, public afAuth: AngularFireAuth) {
    this.firestore = firestore;
    // Si hemos iniciado sesion, loggedId sera nuestro id
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.loggedId = user.uid;
      }
    });
  }

  ngOnInit(): void {
    this.likeDislikeUpdate();
    this.existsOwnerUpdate();
  }

  delete(): void {
    this.firestore.collection('posts').doc(this.postToDisplay.id).delete();
  }

  modifyPost(): void{
    this.router.navigate(['news/' + this.postToDisplay.id]);
  }

  like(): void {
    this.setRating(true);
  }

  dislike(): void {
    this.setRating(false);
  }

  setRating(value: boolean): void {
    if (this.loggedId == null) {
      return;
    }
    if (this.existsUserRating) {
      this.firestore
        .collection('posts')
        .doc(this.postToDisplay.id)
        .collection('likes').doc(this.loggedId).update({
          isLike: value,
          ownerId: this.loggedId
        }
      ).then( () => {
        console.log('likes: ' + this.likes + ' / dislikes: ' + this.dislikes);
      });
    } else {
      this.firestore
        .collection('posts')
        .doc(this.postToDisplay.id)
        .collection('likes').doc(this.loggedId).set({
        isLike: value,
        ownerId: this.loggedId
      }).then(() => {
        console.log('likes: ' + this.likes + ' / dislikes: ' + this.dislikes);
      });
    }
  }

  existsOwnerUpdate(): void {
    this.firestore.collection('posts').doc(this.postToDisplay.id).
    collection('likes', ref => ref.where('ownerId', '==', this.loggedId)).
    valueChanges().subscribe(value => {
      this.existsUserRating = value.length > 0;
    });
  }

  likeDislikeUpdate(): any {
    this.likesCollection = this.firestore.collection('posts').doc(this.postToDisplay.id).
    collection('likes', ref => ref.where('isLike', '==', true));
    this.likesCollection.valueChanges().subscribe(value => {
      this.likes = value.length;
      return this.likes;
    });
    this.dislikesCollection = this.firestore.collection('posts').doc(this.postToDisplay.id).
    collection('likes', ref => ref.where('isLike', '==', false));
    this.dislikesCollection.valueChanges().subscribe(value => {
      this.dislikes = value.length;
      return this.dislikes;
    });
  }
}
