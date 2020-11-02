import { Component, OnInit } from '@angular/core';
import {Fan} from '../../models/fan/fan.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {SocialNetworkEnum} from '../../models/socialnetworks/socialnetworks.model';
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
  private locModification: any;

  constructor(private _location: Location, private formBuilder: FormBuilder, private firestore: AngularFirestore, private router: Router, private route: ActivatedRoute) {
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
    this.modificationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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
      imageSource: this.imageModification,
      location: this.locModification,
    };
    console.warn(fan.name + ';' + fan.phone + ';' + fan.email + ';' + fan.imageSource + ';'  + fan.location);
    this.printedProfile.update(fan)
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

  changeView(): void {
    this.successMessage = '';
    this.router.navigate([this.path]);
  }
}
