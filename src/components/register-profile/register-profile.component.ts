import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {Musician} from '../../models/musician/musician.model';
import {SocialNetwork} from '../../models/profile/profile.model';
import {Genre} from '../../models/genre/genre.model';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {Band} from '../../models/band/band.model';
import { Fan } from 'src/models/fan/fan.model';

@Component({
  selector: 'app-register-profile',
  templateUrl: './register-profile.component.html',
  styleUrls: ['./register-profile.component.sass']
})
export class RegisterProfileComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroupMusician: FormGroup;
  thirdFormGroup: FormGroup;
  thirdFormGroupBand: FormGroup;
  selected = 'option2';

  musicianProfiles;
  fanProfiles;
  bandProfiles;

  successMessage = '';
  private _success = new Subject<string>();

  constructor(private formBuilder: FormBuilder, private afs: AngularFirestore) {
    this.musicianProfiles = afs.collection<Musician>('musicianProfiles');
    this.fanProfiles = afs.collection<Fan>('fanProfiles');
    this.bandProfiles = afs.collection<Band>('bandProfiles');
  }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      profileRole: ['', [Validators.required]],
    });
    this.secondFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      imageurl: ['', [Validators.required]],
      phone: ['', []],
    });
    this.thirdFormGroupMusician = this.formBuilder.group({
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
      precioSuscripcion: ['', [Validators.required]],
    });
    this.thirdFormGroupBand = this.formBuilder.group({
      location: ['', [Validators.required]],
      description: ['', []],
      precioSuscripcion: ['', [Validators.required]],
    });

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');

  }

  sendForm(): void {
    if (this.firstFormGroup.value.profileRole  === 'musician'){
      const musician = {
        name: this.secondFormGroup.value.name,
        email: this.secondFormGroup.value.email,
        password: this.secondFormGroup.value.password,
        imageSource: this.secondFormGroup.value.imageurl,
        phone: this.secondFormGroup.value.phone,
        description: this.thirdFormGroupMusician.value.description,
        genres: ['EjemploGenero'],
        location: this.thirdFormGroupMusician.value.location,
        socialNetworks: SocialNetwork.FACEBOOK,
        subscriptionPrice: this.thirdFormGroupMusician.value.precioSuscripcion
      };
      this.musicianProfiles.add(musician);
      this._success.next('Perfil creado con exito!');
    } else if (this.firstFormGroup.value.profileRole  === 'fan'){
      // TODO Implement fan logic
      const fan = {
        name: this.secondFormGroup.value.name,
        email: this.secondFormGroup.value.email,
        password: this.secondFormGroup.value.password,
        imageSource: this.secondFormGroup.value.imageurl,
        phone: this.secondFormGroup.value.phone
      };
      this.fanProfiles.add(fan);
      this._success.next('Perfil creado con exito!');
    } else if (this.firstFormGroup.value.profileRole  === 'band'){
      // TODO Implement band logic
      const band = {
        name: this.secondFormGroup.value.name,
        email: this.secondFormGroup.value.email,
        password: this.secondFormGroup.value.password,
        imageSource: this.secondFormGroup.value.imageurl,
        phone: this.secondFormGroup.value.phone,
        description: this.thirdFormGroupBand.value.description,
        genres: ['EjemploGenero'],
        location: this.thirdFormGroupBand.value.location,
        socialNetworks: SocialNetwork.FACEBOOK,
        subscriptionPrice: this.thirdFormGroupBand.value.precioSuscripcion
      };
      this.bandProfiles.add(band);
      this._success.next('Perfil creado con exito!');
    } // else {
      // TODO Implement contratante logic
    // }
  }
}
