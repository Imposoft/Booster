import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/post/post.model';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireAuth} from '@angular/fire/auth';
// import {FormGroup, Validators} from '@angular/forms';
import {Musician} from '../../models/musician/musician.model';
import {Profile} from '../../models/profile/profile.model';
import {BandModificationView} from '../../views/band-modification/band-modification.view';
import {Band} from '../../models/band/band.model';
import {Fan} from '../../models/fan/fan.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {max} from 'rxjs/operators';
import {CollectionReference} from '@angular/fire/firestore';
import DocumentData = firebase.firestore.DocumentData;

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.sass']
})
export class PostCardComponent implements OnInit {
  @Input() postToDisplay: Post;
  @Input() isOwner: boolean;
  private profile: any;
  public commentsShown: boolean;
  public firestore: AngularFirestore;

  public loggedId: string;
  public role: string;
  public name: string;
  public comment: FormGroup;
  public modificationForm: FormGroup;
  public perfil: any;
  public guardar: any;

  private finalUrl: any;
  public newsPic: any;

  public likes: any = 0;
  public dislikes: any = 0;
  public variable: string;
  public likesCollection: AngularFirestoreCollection<DocumentData>;
  public dislikesCollection: AngularFirestoreCollection<DocumentData>;
  public existsUserRating: boolean;

  constructor(firestore: AngularFirestore, private router: Router, public afAuth: AngularFireAuth, private formBuilder: FormBuilder, public storage: AngularFireStorage) {
    this.firestore = firestore;
    this.loggedId = '';
    // Si hemos iniciado sesion, loggedId sera nuestro id
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.loggedId = user.uid;
        this.role = user.photoURL;
      }
      if (this.role === 'FAN') {
        this.profile = this.firestore.doc<Fan>('fanProfiles/' + this.loggedId);
        this.profile.valueChanges().subscribe((val) => {
          this.name = val.name;
        });
      }
      if (this.role === 'MUSICIAN') {
        this.profile = this.firestore.doc<Musician>('musicianProfiles/' + this.loggedId);
        this.profile.valueChanges().subscribe((val) => {
          this.name = val.name;
        });
      }
      if (this.role === 'BAND') {
        this.profile = this.firestore.doc<Band>('bandProfiles/' + this.loggedId);
        this.profile.valueChanges().subscribe((val) => {
          this.name = val.name;
        });
      }
    });
  }

  ngOnInit(): void {
    this.modificationForm = this.formBuilder.group({
      comment: ['', []]
    });
    this.likeDislikeUpdate();
    this.existsOwnerUpdate();

    const ref = this.storage.ref(this.postToDisplay.imgUrl);
    this.finalUrl = ref.getDownloadURL().subscribe(url => {
      this.newsPic = url;
    });
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

  enviar(): void {
    // this.guardar = {comment: this.modificationForm.value.comentario, ownerName: this.name, id: this.loggedId};
    // console.log(this.guardar);
    // guardar en firebase
    /*
    if (this.role === 'BAND') {
      // subir
    } else if (this.role === 'MUSICIAN') {
      // subir
    } else if (this.role === 'FAN') {
      // subir
    }*/
    // No funciona la siguiente función para borrar el comentario de la caja que acaba de subir
    // this.modificationForm.reset('');
    const commentMessage: any = {comment: this.modificationForm.value.comment, id: this.loggedId, ownerName: this.name, randomID: Math.floor(Math.random() * 10000)};
    this.firestore
      .collection('posts')
      .doc(this.postToDisplay.id).get().subscribe();
    this.firestore
      .collection('posts')
      .doc(this.postToDisplay.id).update({
        creationOwner: firebase.firestore.FieldValue.arrayUnion(commentMessage)
      }).then(() => {
      console.log('todo ok');
    });
  }

  /*userLoggedIsProfileOwner(): boolean {
    return this.loggedId !== '';
  }

  obtenerNombre(id: string, rol: string): any {
    if (rol === 'MUSICIAN') {
      this.musico = this.firestore.doc<Musician>('musicianProfiles/' + id);
      // this.musico = this.firestore.collection<Musician>('musicianProfiles').doc(id).valueChanges();
      return(this.musico.name);
    }
    if (rol === 'BAND') {
      this.musico = this.firestore.doc<Band>('bandProfiles/' + id);
      // this.musico = this.firestore.collection<Musician>('musicianProfiles').doc(id).valueChanges();
      return(this.musico.name);
    }
    if (rol === 'FAN') {
      this.musico = this.firestore.doc<Fan>('fanProfiles/' + id);
      // this.musico = this.firestore.collection<Musician>('musicianProfiles').doc(id).valueChanges();
      return(this.musico.name);
    }
  }*/

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
