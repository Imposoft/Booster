import { Component, OnInit } from '@angular/core';
import {JobOffer} from '../../models/jobs/job-offer.model';
import {Band} from '../../models/band/band.model';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {debounceTime} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Genre} from '../../models/genre/genre.model';

@Component({
  selector: 'app-job-offer-modification',
  templateUrl: './job-offer-modification.view.html',
  styleUrls: ['./job-offer-modification.view.sass']
})
export class JobOfferModificationView implements OnInit {
  public pathId: string;
  private printedJobOffer: any;
  public jobOfferPost: JobOffer;
  public jobOfferOwner: Band;
  public genreModified: Genre[];

  public ownerPathId: string;
  public exclusive = false;
  public promoted = false;

  modificationForm: FormGroup;

  private _success = new Subject<string>();
  public successMessage = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private afs: AngularFirestore, public afAuth: AngularFireAuth) {

    // Oferta de trabajo  vacia sobre el que cargar los datos
    this.jobOfferPost = {body: '', exclusive: false, imgUrl: '', owner: undefined, budget: 0, promoted: false, title: '', genres: [], userWaitList: [], endData: '', extraFiles: ''};
    this.jobOfferOwner = {description: '', email: '', members: [], genres: [], imageSource: '', jobOffers: [], location: '', name: '', password: '', phone: '', socialNetworks: [], subscription: undefined, subscriptionPrice: 0};

    // Recibimos el id del url de la web o en su defecto utilizamos uno por defecto
    this.route.params.subscribe( params => {
        if (params.id) {
          this.pathId = params.id;
        } else {
          this.pathId = 'dKAmFasidHlD5ZpD9ttP';
        }
        this.printedJobOffer = afs.doc<JobOffer>('jobOfferPosts/' + this.pathId);
      }
    );
    this.jobOfferPost = this.printedJobOffer.valueChanges();
  }

  ngOnInit(): void {
    this.modificationForm = this.formBuilder.group({
      body: ['', [Validators.required]],
      exclusive: ['', [Validators.required]],
      imgUrl: ['', [Validators.required]],
      owner: ['', [Validators.required]],
      budget: ['', [Validators.required]],
      promoted: ['', [Validators.required]],
      title: ['', [Validators.required]],
      genres: ['', [Validators.required]],
      usertWaitList: ['', [Validators.required]],
      endData: ['', [Validators.required]],
      extraFiles: ['', [Validators.required]]
    });
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(2500)
    ).subscribe(() => this.successMessage = '');
  }

  sendForm(): void {
    this.checkValues();
    this.printedJobOffer.update(this.jobOfferPost)
      .catch(error => console.log(error));
    this._success.next('Noticia creada con exito!');
    this.changeView();
  }

  checkValues(): void {
    if (this.modificationForm.value.body !== ''){ this.jobOfferPost.body = this.modificationForm.value.body; }
    if (this.modificationForm.value.exclusive !== ''){ this.jobOfferPost.exclusive = this.modificationForm.value.exclusive; }
    if (this.modificationForm.value.imgUrl !== ''){ this.jobOfferPost.imgUrl = this.modificationForm.value.imageUrl; }
    if (this.modificationForm.value.owner !== ''){ this.jobOfferPost.owner = this.modificationForm.value.owner; }
    if (this.modificationForm.value.budget !== ''){ this.jobOfferPost.budget = this.modificationForm.value.budget; }
    if (this.modificationForm.value.promoted !== ''){ this.jobOfferPost.promoted = this.modificationForm.value.promoted; }
    if (this.modificationForm.value.title !== ''){ this.jobOfferPost.body = this.modificationForm.value.title; }
    if (this.modificationForm.value.genres !== ''){ this.jobOfferPost.genres = this.modificationForm.value.genres; }
    if (this.modificationForm.value.endData !== ''){ this.jobOfferPost.endData = this.modificationForm.value.endData; }
    if (this.modificationForm.value.extraFiles !== ''){ this.jobOfferPost.extraFiles = this.modificationForm.value.extraFiles; }
    if (this.genreModified !== undefined) { this.jobOfferPost.genres = this.genreModified; }
  }

  changeView(): void {
    this.successMessage = '';
    this.router.navigate(['jobOffer/' + this.pathId]);
  }

  changeGenres($event: Genre[]): void {
    this.genreModified = $event;
    console.log($event);
  }
}
