import {Component, Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {Post} from '../../models/post/post.model';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ActivatedRoute, Router} from '@angular/router';
import {Fan} from '../../models/fan/fan.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {Location} from '@angular/common';

@Component({
  selector: 'app-news',
  templateUrl: './news.view.html',
  styleUrls: ['./news.view.sass']
})

export class NewsView implements OnInit {
  public news: Post;
  private newsPrinted: any;
  public modificationForm: FormGroup;
  public exclusive = false;
  public promoted = false;
  private pathId: string;

  private _success = new Subject<string>();
  successMessage = '';
  public loggedId: string;

  constructor(private formBuilder: FormBuilder,
              public firestore: AngularFirestore,
              private router: Router,
              private route: ActivatedRoute,
              public afAuth: AngularFireAuth,
              public location: Location) {
    // Perfil vacio sobre el que cargar los datos
    this.news = {title: '', body: '', promoted: false, exclusive: false, imgUrl: '', owner: ''};

    // Recibimos el id del url de la web o en su defecto utilizamos uno por defecto
    this.route.params.subscribe( params => {
      if (params.id) {
        this.pathId = params.id;
        // Cargamos el perfil sobre el perfil vacio
        this.newsPrinted = firestore.doc<Post>('posts/' + this.pathId);
        this.newsPrinted.valueChanges().subscribe((news) => {
          this.news = news;
        });
      }
      // Si hemos iniciado sesion, loggedId sera nuestro id
      this.afAuth.authState.subscribe(user => {
        if (user){
          this.loggedId = user.uid;
        }
      });
    });
  }

  /*constructor(private formBuilder: FormBuilder, private afs: AngularFirestore) {
    this.news = afs.collection<Post>('posts');
  }*/

  ngOnInit(): void {
    this.modificationForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      imgUrl: ['', [Validators.required]],
      body: ['', []],
      exclusive: ['', [Validators.required]],
      promoted: ['', [Validators.required]],
    });
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(2500)
    ).subscribe(() => this.successMessage = '');
  }

  sendForm(): void {
    /*const post = {
      title: this.modificationForm.value.title,
      imgUrl: this.modificationForm.value.imgUrl,
      body: this.modificationForm.value.body,
      exclusive: this.exclusive.valueOf(),
      promoted: this.promoted.valueOf(),
      owner: null,
    };
    this.news.add(post);*/
    this.checkValues();
    console.log(this.pathId);
    if (this.pathId !== undefined){
      this.newsPrinted.update(this.news)
        .catch(error => console.log(error));
      this._success.next('Noticia modificada con exito!');
    } else {
      this.newsPrinted = this.firestore.collection<Post>('posts');
      this.pathId = '';
      this.newsPrinted.add(this.news)
        .catch(error => console.log(error));
      this._success.next('Noticia creada con exito!');
    }
    this.changeView();
  }

  checkValues(): void {
    if (this.modificationForm.value.title !== ''){ this.news.title = this.modificationForm.value.title; }
    if (this.modificationForm.value.imgUrl !== ''){ this.news.imgUrl = this.modificationForm.value.imgUrl; }
    if (this.modificationForm.value.body !== ''){ this.news.body = this.modificationForm.value.body; }
    if (this.modificationForm.value.exclusive !== ''){ this.news.exclusive = this.modificationForm.value.exclusive; }
    if (this.modificationForm.value.promoted !== ''){ this.news.promoted = this.modificationForm.value.promoted; }
    this.news.owner = this.loggedId;
  }

  changeView(): void {
    this.location.back();
  }
}

// service to get prev route
@Injectable()
export class RouteBackService {
  public getPreviousUrl(routeArray): string {
    let prevRoute = '';
    for (let i = 0; i < routeArray.length - 1; i++) {
      if (routeArray[i].url._value[0].length > 0) {
        prevRoute += routeArray[i].url._value[0].path + '/';
      }
    }
    return prevRoute.slice(0, -1);
  }
}
