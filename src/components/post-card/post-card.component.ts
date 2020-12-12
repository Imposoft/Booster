import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/post/post.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.sass']
})
export class PostCardComponent implements OnInit {
  @Input() postToDisplay: Post;
  @Input() isOwner: boolean;
  commentsShown: boolean;
  public firestore: AngularFirestore;
  public loggedId: string;

  constructor(firestore: AngularFirestore, private router: Router, public afAuth: AngularFireAuth) {
    this.firestore = firestore;
    this.loggedId = '';
    // Si hemos iniciado sesion, loggedId sera nuestro id
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.loggedId = user.uid;
      }
    });
  }

  ngOnInit(): void {
  }

  delete(): void {
    this.firestore.collection('posts').doc(this.postToDisplay.id).delete();
  }

  modifyPost(): void{
    this.router.navigate(['news/' + this.postToDisplay.id]);
  }

  toggleVisible(): void{
    console.log(this.loggedId);
    this.commentsShown = !this.commentsShown;
  }

  userLoggedIsProfileOwner(): boolean {
    return this.loggedId !== '';
  }
}
