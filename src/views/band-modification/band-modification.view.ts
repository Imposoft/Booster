import { Component, OnInit } from '@angular/core';
import {Band} from '../../models/band/band.model';
import {Observable, Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {SocialNetworkEnum} from '../../models/socialnetworks/socialnetworks.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-band-modification',
  templateUrl: './band-modification.view.html',
  styleUrls: ['./band-modification.view.sass']
})
export class BandModificationView implements OnInit {

  profile: any;
  bandProfiles;
  printedProfile: any;
  modificationForm: FormGroup;
  path: string;

  private _success = new Subject<string>();
  successMessage = '';
  private nameModification: any; private phoneModification: any;
  private emailModification: any; private imageModification: any;
  private locModification: any; private descModification: any;
  private subsModification: any; private psswModification: any;

  constructor(private _location: Location, private formBuilder: FormBuilder, private firestore: AngularFirestore, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
      if (params.id) {
        console.log(params);
        this.printedProfile = firestore.doc<Band>('bandProfiles/' + params.id);
        this.path = 'bandProfile/' + params.id;
      } else {
        console.log(params);
        this.printedProfile = firestore.doc<Band>('bandProfiles/CBaWe62HROxtyWDY050Y');
        this.path = 'bandProfile/CBaWe62HROxtyWDY050Y';
      }
    });
    this.profile = this.printedProfile.valueChanges();
  }

  ngOnInit(): void {
    this.modificationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      imageurl: ['', [Validators.required]],
      members: ['', []],
      phone: ['', []],
      location: ['', [Validators.required]],
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
    const band = {
      name: this.nameModification,
      phone: this.phoneModification,
      email: this.emailModification,
      imageSource: this.imageModification,
      location: this.locModification,
      password: this.psswModification,
      members: this.modificationForm.value.members,
      description: this.descModification,
      genres: [{name: 'Heavy'}, {name: 'Pop'}],
      socialNetworks: [{socialNetwork: SocialNetworkEnum.TWITTER, url: 'https://twitter.com/BTS_twt'},
        {socialNetwork: SocialNetworkEnum.INSTRAGRAM, url: 'https://www.instagram.com/bts.bighitofficial/'}],
      subscriptionPrice: this.subsModification
    };
    this.printedProfile.update(band)
      .catch(error => console.log(error));
    this._success.next('Perfil guardado con exito!');
    this.changeView();
    // this._location.back();
  }

  checkValues(): void {
    if (this.modificationForm.value.name === ''){
      this.profile.subscribe((doc: { name: string; }) => { this.nameModification = doc.name; });
    } else {
      this.nameModification = this.modificationForm.value.name;
    }
    if (this.modificationForm.value.phone === ''){
      this.profile.subscribe((doc: { phone: string; }) => { this.phoneModification = doc.phone; });
    } else {
      this.phoneModification = this.modificationForm.value.phone;
    }
    if (this.modificationForm.value.email === ''){
      this.profile.subscribe((doc: { email: string; }) => { this.emailModification = doc.email; });
    } else {
      this.emailModification = this.modificationForm.value.email;
    }
    if (this.modificationForm.value.password === ''){
      this.profile.subscribe((doc: { password: string; }) => { this.psswModification = doc.password; });
    } else {
      this.psswModification = this.modificationForm.value.password;
    }
    if (this.modificationForm.value.imageurl === ''){
      this.profile.subscribe((doc: { imageSource: string; }) => { this.imageModification = doc.imageSource; });
    } else {
      this.imageModification = this.modificationForm.value.imageurl;
    }
    if (this.modificationForm.value.location === ''){
      this.profile.subscribe((doc: { location: string; }) => { this.locModification = doc.location; });
    } else {
      this.locModification = this.modificationForm.value.location;
    }
    if (this.modificationForm.value.description === ''){
      this.profile.subscribe((doc: { description: string; }) => { this.descModification = doc.description; });
    } else {
      this.descModification = this.modificationForm.value.description;
    }
    if (this.modificationForm.value.subscriptionPrice === ''){
      this.profile.subscribe((doc: { subscriptionPrice: string; }) => { this.subsModification = doc.subscriptionPrice; });
    } else {
      this.subsModification = this.modificationForm.value.subscriptionPrice;
    }
  }

  changeView(): void {
    this.successMessage = '';
    this.router.navigate([this.path]);
  }
}
