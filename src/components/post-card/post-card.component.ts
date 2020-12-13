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

  constructor(firestore: AngularFirestore, private router: Router, public afAuth: AngularFireAuth, private formBuilder: FormBuilder) {
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
      comentario: ['', []],
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
    this.guardar = {comment: this.modificationForm.value.comentario, ownerName: this.name, id: this.loggedId};
    console.log(this.guardar);
    // guardar en firebase
    if (this.role === 'BAND') {
      // subir
    } else if (this.role === 'MUSICIAN') {
      // subir
    } else if (this.role === 'FAN') {
      // subir
    }
    // No funciona la siguiente función para borrar el comentario de la caja que acaba de subir
    // this.modificationForm.reset('');
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
}
