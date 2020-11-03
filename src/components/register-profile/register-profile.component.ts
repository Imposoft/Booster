import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {Musician} from '../../models/musician/musician.model';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {Band} from '../../models/band/band.model';
import {Fan} from 'src/models/fan/fan.model';
import {Router} from '@angular/router';
import {SocialNetworkEnum, SocialNetworks} from '../../models/socialnetworks/socialnetworks.model';
import {Genre} from '../../models/genre/genre.model';


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

  socialNetworksTemplate: SocialNetworks[];

  successMessage = '';
  private _success = new Subject<string>();

  constructor(private formBuilder: FormBuilder, private afs: AngularFirestore, private route: Router) {
    this.musicianProfiles = afs.collection<Musician>('musicianProfiles');
    this.fanProfiles = afs.collection<Fan>('fanProfiles');
    this.bandProfiles = afs.collection<Band>('bandProfiles');

    this.socialNetworksTemplate = [{
      url: '',
      socialNetwork: SocialNetworkEnum.INSTRAGRAM
    }, {
      url: '',
      socialNetwork: SocialNetworkEnum.SPOTIFY
    }, {
      url: '',
      socialNetwork: SocialNetworkEnum.TWITTER
    }];
  }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      profileRole: ['', [Validators.required]],
    });
    this.secondFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      imageurl: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
    this.thirdFormGroupMusician = this.formBuilder.group({
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
      subscriptionPrice: ['', [Validators.required]],
      genre: ['', []],
    });
    this.thirdFormGroupBand = this.formBuilder.group({
      location: ['', [Validators.required]],
      description: ['', []],
      subscriptionPrice: ['', [Validators.required]],
      member1Name: ['', []],
      member2Name: ['', []],
      member3Name: ['', []],
      member1Url: ['', []],
      member2Url: ['', []],
      member3Url: ['', []],
      genre: ['', []],
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
        genres: this.stringToGenresM(),
        location: this.thirdFormGroupMusician.value.location,
        socialNetworks: this.socialNetworksTemplate,
        subscriptionPrice: this.thirdFormGroupMusician.value.subscriptionPrice
      };
      this.musicianProfiles.add(musician);
    } else if (this.firstFormGroup.value.profileRole  === 'fan'){
      // TODO Implement fan logic
      const fan = {
        name: this.secondFormGroup.value.name,
        email: this.secondFormGroup.value.email,
        password: this.secondFormGroup.value.password,
        imageSource: this.secondFormGroup.value.imageurl,
        phone: this.secondFormGroup.value.phone,
        socialNetworks: this.socialNetworksTemplate
      };
      this.fanProfiles.add(fan);
    } else if (this.firstFormGroup.value.profileRole  === 'band'){
      // TODO Implement band logic
      const user1 = {
        name: this.thirdFormGroupBand.value.member1Name,
        email: '',
        password: '',
        imageSource: this.thirdFormGroupBand.value.member1Url,
        phone: '',
        description: '',
        genres: ['EjemploGenero'],
        location: '',
        socialNetworks: [],
        subscriptionPrice: 25
      };
      const user2 = {
        name: this.thirdFormGroupBand.value.member2Name,
        email: '',
        password: '',
        imageSource: this.thirdFormGroupBand.value.member2Url,
        phone: '',
        description: '',
        genres: ['EjemploGenero'],
        location: '',
        socialNetworks: [],
        subscriptionPrice: 25
      };
      const user3 = {
        name: this.thirdFormGroupBand.value.member3Name,
        email: '',
        password: '',
        imageSource: this.thirdFormGroupBand.value.member3Url,
        phone: '',
        description: '',
        genres: ['EjemploGenero'],
        location: '',
        socialNetworks: [],
        subscriptionPrice: 25
      };
      const band = {
        name: this.secondFormGroup.value.name,
        email: this.secondFormGroup.value.email,
        password: this.secondFormGroup.value.password,
        imageSource: this.secondFormGroup.value.imageurl,
        phone: this.secondFormGroup.value.phone,
        members: [user1, user2, user3],
        description: this.thirdFormGroupBand.value.description,
        genres: this.stringToGenresB(),
        location: this.thirdFormGroupBand.value.location,
        socialNetworks: this.socialNetworksTemplate,
        subscriptionPrice: this.thirdFormGroupBand.value.subscriptionPrice
      };
      this.bandProfiles.add(band);
    } // else {
      // TODO Implement contratante logic
    // }
    this._success.next('Perfil creado con exito!');
    this.changeView();
  }

  changeView(): void {
    this.successMessage = '';
    this.route.navigate(['/home']);
  }

  stringToGenresM(): Genre[]{
    const genreString = this.thirdFormGroupMusician.value.genre;
    return genreString.split(', ');
  }
  stringToGenresB(): Genre[]{
    const genreString = this.thirdFormGroupBand.value.genre;
    return genreString.split(', ');
  }
}
