import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/post/post.model';
import {AngularFirestore, AngularFirestoreCollection, CollectionReference} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import DocumentData = firebase.firestore.DocumentData;

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
  public dislikes: number = 0;
  public variable: string;
  public numeroLikes: AngularFirestoreCollection<DocumentData>;
  public coleccionValoraciones: AngularFirestoreCollection<DocumentData>;


  constructor(firestore: AngularFirestore, private router: Router) {
    this.firestore = firestore;
  }

  ngOnInit(): void {
    this.likes = this.pruebaTexto();
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

  pruebaTexto(): any {
    // this.variable = '';
    this.coleccionValoraciones = this.firestore.collection('posts').doc(this.postToDisplay.id).
      collection('likes', ref => ref.where('isLike', '==', true));

    this.coleccionValoraciones.valueChanges().subscribe(value => {
      this.likes = value.length;
      return this.likes;
    });

    /*const numberDis: number = this.numeroDislikes.get().toPromise.length;
    // for (let counter: number = 0; counter < numberDis; counter++) {
    //   this.numeroDislikes.doc(1);
    // }
    return 'unTexto';
    return '';*/
  }

  /*userLoggedIsProfileOwner(): boolean {
    return this.loggedId === this.pathId;
  }*/
}
