import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {debounceTime} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Fan} from '../../models/fan/fan.model';
import {SocialNetworkEnum, SocialNetworks} from '../../models/socialnetworks/socialnetworks.model';
import {Genre} from '../../models/genre/genre.model';
import {Band} from '../../models/band/band.model';
import {Musician} from '../../models/musician/musician.model';

@Component({
  selector: 'app-profile-modification',
  templateUrl: './profile-modification.view.html',
  styleUrls: ['./profile-modification.view.sass']
})

export class ProfileModificationView implements OnInit {
  public socialNetworksModified: SocialNetworks[];
  public genreModified: Genre[];
  private printedProfile: any;
  public profile: Musician;
  public modificationForm: FormGroup;
  private pathId: string;

  private _success = new Subject<string>();
  successMessage = '';

  constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore, private router: Router, private route: ActivatedRoute) {
    // Perfil vacio sobre el que cargar los datos
    this.profile = {description: '', email: '', genres: [], imageSource: '', instruments: [], jobOffers: [], location: '', name: '', password: '', phone: '', socialNetworks: [], subscription: undefined, subscriptionPrice: 0, tutorials: [], reservations: []};

    // Recibimos el id del url de la web o en su defecto utilizamos uno por defecto
    this.route.params.subscribe( params => {
        if (params.id) {
          this.pathId = params.id;
        } else {
          this.pathId = 'profile/IfcscpI7GL2pFaZKEccf';
        }
      });
    // Cargamos el perfil sobre el perfil vacio
    this.printedProfile = firestore.doc<Musician>('musicianProfiles/' + this.pathId);
    this.printedProfile.valueChanges().subscribe((musician) => {
      this.profile = musician;
    });
  }


  ngOnInit(): void {
    this.modificationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      imageurl: ['', [Validators.required]],
      location: ['', []],
      description: ['', []],
      instruments: ['', []],
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
    if (this.modificationForm.value.pass !== ''){ this.profile.password = this.modificationForm.value.password; }
    if (this.modificationForm.value.imageurl !== ''){ this.profile.imageSource = this.modificationForm.value.imageurl; }
    if (this.modificationForm.value.location !== ''){ this.profile.location = this.modificationForm.value.location; }
    if (this.modificationForm.value.description !== ''){ this.profile.description = this.modificationForm.value.description; }
    if (this.modificationForm.value.instruments !== ''){ this.profile.instruments = this.modificationForm.value.instruments; }
    if (this.modificationForm.value.subscriptionPrice !== ''){ this.profile.subscriptionPrice = this.modificationForm.value.subscriptionPrice; }
    if (this.socialNetworksModified !== undefined) { this.profile.socialNetworks = this.socialNetworksModified; }
    if (this.genreModified !== undefined) { this.profile.genres = this.genreModified; }
  }

  changeView(): void {
    this.successMessage = '';
    this.router.navigate(['profile/' + this.pathId]);
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
