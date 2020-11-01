import { Component, OnInit } from '@angular/core';
import {Profile} from '../../models/profile/profile.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {SocialNetworkEnum} from '../../models/socialnetworks/socialnetworks.model';
import {debounceTime} from 'rxjs/operators';
import {Location} from '@angular/common';

@Component({
  selector: 'app-profile-modification',
  templateUrl: './profile-modification.view.html',
  styleUrls: ['./profile-modification.view.sass']
})

export class ProfileModificationView implements OnInit {

  printedProfile: any;
  profile: any;
  profileProfiles;
  modificationForm: FormGroup;

  private _success = new Subject<string>();
  successMessage = '';
  private nameModification: any; private phoneModification: any;
  private emailModification: any; private imageModification: any;
  private locModification: any;

  private nombre: string;

  constructor(private _location: Location, private formBuilder: FormBuilder, private firestore: AngularFirestore) {
    this.printedProfile = firestore.doc<Profile>('profileProfiles/NKUHb5YBHaCDQmSpWUFh');
    this.profile = this.printedProfile.valueChanges();
  }


  ngOnInit(): void {
    this.profile.subscribe(value => {
      this.nameModification = value.name;
      this.phoneModification = value.phone;
      this.emailModification = value.email;
      this.imageModification = value.imageModification;
      this.locModification = value.location;
    });
    this.modificationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
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
    const profile = {
      name: this.nameModification,
      phone: this.phoneModification,
      email: this.emailModification,
      imageSource: this.imageModification,
      location: this.locModification,
    };
    console.warn(profile.name + ';' + profile.phone + ';' + profile.email + ';' + profile.imageSource + ';'  + profile.location);
    this.printedProfile.update(profile)
      .catch(error => console.log(error));
    this._success.next('Perfil guardado con exito!');
    this._location.back();
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
  }

}