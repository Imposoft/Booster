import { Component, OnInit } from '@angular/core';
import {Fan} from '../../models/fan/fan.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {SocialNetworkEnum, SocialNetworks} from '../../models/socialnetworks/socialnetworks.model';
import {debounceTime} from 'rxjs/operators';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-fan-modification',
  templateUrl: './fan-modification.view.html',
  styleUrls: ['./fan-modification.view.sass']
})

export class FanModificationView implements OnInit {

  printedProfile: any;
  profile: any;
  fanProfiles;
  modificationForm: FormGroup;
  path: string;

  private _success = new Subject<string>();
  successMessage = '';
  private nameModification: any; private phoneModification: any;
  private emailModification: any; private imageModification: any;
  private locModification: any; private passModification: any;
  private instaModification: string; private spotifyModification: string; private twitterModification: string;
  private instaNetwork: any;
  private spotifyNetwork: any;
  private twitterNetwork: any;

  constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
        if (params.id) {
          console.log(params);
          this.printedProfile = firestore.doc<Fan>('fanProfiles/' + params.id);
          this.path = 'fanProfile/' + params.id;
        } else {
          console.log(params);
          this.printedProfile = firestore.doc<Fan>('fanProfiles/NKUHb5YBHaCDQmSpWUFh');
          this.path = 'fanProfile/NKUHb5YBHaCDQmSpWUFh';
        }
      });
    this.profile = this.printedProfile.valueChanges();
  }


  ngOnInit(): void {
    this.profile.subscribe(value => {
      this.nameModification = value.name;
      this.phoneModification = value.phone;
      this.emailModification = value.email;
      this.passModification = value.password;
      this.imageModification = value.imageSource;
      this.locModification = value.location;

      if (value.socialNetworks === undefined) {
        this.instaModification = '';
        this.spotifyModification = '';
        this.twitterModification = '';
      } else {
        if (value.socialNetworks[0].url !== undefined) {
          this.instaModification = value.socialNetworks[0].url;
        }
        if (value.socialNetworks[1].url !== undefined) {
          this.spotifyModification = value.socialNetworks[1].url;
        }
        if (value.socialNetworks[2].url !== undefined) {
          this.twitterModification = value.socialNetworks[2].url;
        }}
    });
    this.modificationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      imageurl: ['', [Validators.required]],
      location: ['', []],
    });
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');
  }

  sendForm(): void {
    this.checkValues();
    const fan = {
      name: this.nameModification,
      phone: this.phoneModification,
      email: this.emailModification,
      password: this.passModification,
      imageSource: this.imageModification,
      location: this.locModification,
      socialNetworks: this.checkNetworks(),
    };
    console.warn(fan.name + ';' + fan.phone + ';' + fan.email + ';' + fan.imageSource + ';'  + fan.location);
    this.printedProfile.update(fan)
      .catch(error => console.log(error));
    this._success.next('Perfil guardado con exito!');
    this.changeView();
  }
  checkValues(): void {
    if (this.modificationForm.value.name !== ''){ this.nameModification = this.modificationForm.value.name; }
    if (this.modificationForm.value.phone !== ''){ this.phoneModification = this.modificationForm.value.phone; }
    if (this.modificationForm.value.email !== ''){ this.emailModification = this.modificationForm.value.email; }
    if (this.modificationForm.value.password !== ''){ this.passModification = this.modificationForm.value.password; }
    if (this.modificationForm.value.imageurl !== ''){ this.imageModification = this.modificationForm.value.imageurl; }
    if (this.modificationForm.value.location !== ''){ this.locModification = this.modificationForm.value.location; }
  }

  changeView(): void {
    this.successMessage = '';
    this.router.navigate([this.path]);
  }

  checkNetworks(): SocialNetworks[] {
    if (this.modificationForm.value.urlInsta !== '') {
      this.instaNetwork = { socialNetwork: SocialNetworkEnum.INSTRAGRAM, url: this.modificationForm.value.urlInsta };
    } else {
      this.instaNetwork = { socialNetwork: SocialNetworkEnum.INSTRAGRAM, url: this.instaModification };
    }
    if (this.modificationForm.value.urlSpotify !== '') {
      this.spotifyNetwork = { socialNetwork: SocialNetworkEnum.SPOTIFY, url: this.modificationForm.value.urlSpotify };
    } else {
      this.spotifyNetwork = { socialNetwork: SocialNetworkEnum.SPOTIFY, url: this.spotifyModification };
    }
    if (this.modificationForm.value.urlTwitter !== '') {
      this.twitterNetwork = { socialNetwork: SocialNetworkEnum.TWITTER, url: this.modificationForm.value.urlTwitter };
    } else {
      this.twitterNetwork = { socialNetwork: SocialNetworkEnum.TWITTER, url: this.twitterModification };
    }

    return [this.instaNetwork, this.spotifyNetwork, this.twitterNetwork];
  }
}
