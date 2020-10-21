import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {Musician} from '../../models/musician/musician.model';
import {SocialNetwork} from '../../models/profile/profile.model';
import {Genre} from '../../models/genre/genre.model';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-register-profile',
  templateUrl: './register-profile.component.html',
  styleUrls: ['./register-profile.component.sass']
})
export class RegisterProfileComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  selected = 'option2';

  musicianProfiles;

  successMessage = '';
  private _success = new Subject<string>();

  constructor(private formBuilder: FormBuilder, private afs: AngularFirestore) {
    this.musicianProfiles = afs.collection<Musician>('musicianProfiles');
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
    });
    this.thirdFormGroup = this.formBuilder.group({
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
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
        phone: 'ejemplotelef',
        description: this.thirdFormGroup.value.description,
        genres: ['EjemploGenero'],
        location: this.thirdFormGroup.value.location,
        socialNetworks: SocialNetwork.FACEBOOK,
        subscriptionPrice: this.thirdFormGroup.value.precioSuscripcion
      };
      this.musicianProfiles.add(musician);
      this._success.next('Perfil creado con exito!');
    } else if (this.firstFormGroup.value.profileRole  === 'fan'){
      // TODO Implement fan logic
    } else if (this.firstFormGroup.value.profileRole  === 'band'){
      // TODO Implement band logic
    }
  }
}
