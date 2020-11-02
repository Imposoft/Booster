import { Component, OnInit } from '@angular/core';
import {Profile} from '../../models/profile/profile.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {SocialNetworkEnum} from '../../models/socialnetworks/socialnetworks.model';
import {debounceTime} from 'rxjs/operators';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Fan} from '../../models/fan/fan.model';

@Component({
  selector: 'app-profile-modification',
  templateUrl: './profile-modification.view.html',
  styleUrls: ['./profile-modification.view.sass']
})

export class ProfileModificationView implements OnInit {

  printedProfile: any;
  profile: any;
  modificationForm: FormGroup;
  path: string;

  private _success = new Subject<string>();
  successMessage = '';
  private nameModification: any; private phoneModification: any;
  private emailModification: any; private imageModification: any;
  private locModification: any; private descriptionModification: any;
  private instrumentsModification: any; private passModification: any;
  private subsModification: any;

  constructor(private _location: Location, private formBuilder: FormBuilder, private firestore: AngularFirestore, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
        if (params.id) {
          console.log(params);
          this.printedProfile = firestore.doc<Fan>('musicianProfiles/' + params.id);
          this.path = 'profile/' + params.id;
        } else {
          console.log(params);
          this.printedProfile = firestore.doc<Fan>('musicianProfiles/IfcscpI7GL2pFaZKEccf');
          this.path = 'profile/IfcscpI7GL2pFaZKEccf';
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
      this.descriptionModification = value.description;
      this.instrumentsModification = value.instruments;
      this.subsModification = value.subscriptionPrice;
    });
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
    const profile = {
      name: this.nameModification,
      phone: this.phoneModification,
      email: this.emailModification,
      password: this.passModification,
      imageSource: this.imageModification,
      location: this.locModification,
      description: this.descriptionModification,
      instruments: this.instrumentsModification,
      subscriptionPrice: this.subsModification
    };
    console.warn('Okay');
    this.printedProfile.update(profile)
      .catch(error => console.log(error));
    this._success.next('Perfil guardado con exito!');
    this.changeView();
    /*this._location.back();*/
  }
  checkValues(): void {
    if (this.modificationForm.value.name !== ''){ this.nameModification = this.modificationForm.value.name; }
    if (this.modificationForm.value.phone !== ''){ this.phoneModification = this.modificationForm.value.phone; }
    if (this.modificationForm.value.email !== ''){ this.emailModification = this.modificationForm.value.email; }
    if (this.modificationForm.value.pass !== ''){ this.passModification = this.modificationForm.value.password; }
    if (this.modificationForm.value.imageurl !== ''){ this.imageModification = this.modificationForm.value.imageurl; }
    if (this.modificationForm.value.location !== ''){ this.locModification = this.modificationForm.value.location; }
    if (this.modificationForm.value.description !== ''){ this.descriptionModification = this.modificationForm.value.description; }
    if (this.modificationForm.value.instruments !== ''){ this.instrumentsModification = this.modificationForm.value.instruments; }
    if (this.modificationForm.value.subscriptionPrice !== ''){ this.subsModification = this.modificationForm.value.subscriptionPrice; }
  }

  changeView(): void {
    this.successMessage = '';
    this.router.navigate([this.path]);
  }
}
