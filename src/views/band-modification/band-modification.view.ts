import { Component, OnInit } from '@angular/core';
import {Band} from '../../models/band/band.model';
import {Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {SocialNetworkEnum, SocialNetworks} from '../../models/socialnetworks/socialnetworks.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Genre} from '../../models/genre/genre.model';

@Component({
  selector: 'app-band-modification',
  templateUrl: './band-modification.view.html',
  styleUrls: ['./band-modification.view.sass']
})
export class BandModificationView implements OnInit {
  public socialNetworksModified: SocialNetworks[];
  public genreModified: Genre[];
  public profile: Band;
  private printedProfile: any;
  public modificationForm: FormGroup;
  private pathId: string;

  private _success = new Subject<string>();
  successMessage = '';

  constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore, private router: Router, private route: ActivatedRoute) {
    // Perfil vacio sobre el que cargar los datos
    this.profile = {auditions: [undefined], description: '', email: '', genres: [], imageSource: '', jobOffers: [undefined], location: '', members: [], name: '', password: '', phone: '', socialNetworks: [], subscription: undefined, subscriptionPrice: 0};

    // Recibimos el id del url de la web o en su defecto utilizamos uno por defecto
    this.route.params.subscribe( params => {
      if (params.id) {
        this.pathId = params.id;
      } else {
        console.log(params);
        this.pathId = 'n6ZhZ1TJI7iayJS4GQrc';
      }
    });
    // Cargamos el perfil sobre el perfil vacio
    this.printedProfile = firestore.doc<Band>('bandProfiles/' + this.pathId);
    this.printedProfile.valueChanges().subscribe((band) => {
      this.profile = band;
    });
  }

  ngOnInit(): void {
    this.modificationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      imageurl: ['', [Validators.required]],
      members: ['', []],
      phone: ['', []],
      location: ['', [Validators.required]],
      urlInsta: ['', []],
      urlSpotify: ['', []],
      urlTwitter: ['', []],
      description: ['', []],
      subscriptionPrice: ['', [Validators.required]]
    });

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');
  }

  sendForm(): void {
    this.checkValues();
    this.printedProfile.update(this.profile)
      .catch(error => console.log(error));
    this._success.next('Perfil guardado con exito!');
    this.changeView();
  }

  checkValues(): void {
    if (this.modificationForm.value.name !== ''){ this.profile.name = this.modificationForm.value.name; }
    if (this.modificationForm.value.phone !== ''){ this.profile.phone = this.modificationForm.value.phone; }
    if (this.modificationForm.value.email !== ''){ this.profile.email = this.modificationForm.value.email; }
    if (this.modificationForm.value.password !== ''){ this.profile.password = this.modificationForm.value.password; }
    if (this.modificationForm.value.imageurl !== ''){ this.profile.imageSource = this.modificationForm.value.imageurl; }
    if (this.modificationForm.value.location !== ''){ this.profile.location = this.modificationForm.value.location; }
    if (this.modificationForm.value.description !== ''){ this.profile.description = this.modificationForm.value.description; }
    if (this.modificationForm.value.subscriptionPrice !== ''){ this.profile.subscriptionPrice = this.modificationForm.value.subscriptionPrice; }
    this.profile.socialNetworks = this.socialNetworksModified;
    this.profile.genres = this.genreModified;
  }

  changeView(): void {
    this.successMessage = '';
    this.router.navigate(['bandProfile/' + this.pathId]);
  }

  stringToGenresB(): Genre[]{
    const genreString = this.modificationForm.value.genres;
    return genreString.split(', ');
  }

  genresToString(): string{
    const genres = this.profile.genres;
    let result = '';
    for (const genre of genres) {
      result += genre.name + ', ';
    }
    return result;
  }

  changeSocialNetworks($event: SocialNetworks[]): void {
    this.socialNetworksModified = $event;
    console.log($event);
  }

  changeGenres($event: Genre[]): void {
    this.genreModified = $event;
    console.log($event);
  }
}
