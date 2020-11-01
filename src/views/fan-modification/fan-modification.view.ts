import { Component, OnInit } from '@angular/core';
import {Fan} from '../../models/fan/fan.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {SocialNetworkEnum} from '../../models/socialnetworks/socialnetworks.model';
import {debounceTime} from 'rxjs/operators';
import {Location} from '@angular/common';

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

  private _success = new Subject<string>();
  successMessage = '';

  constructor(private _location: Location, private formBuilder: FormBuilder, private firestore: AngularFirestore) {
    this.fanProfiles = firestore.collection<Fan>('fanProfiles');
    this.printedProfile = firestore.doc<Fan>('fanProfiles/NKUHb5YBHaCDQmSpWUFh');
    this.profile = this.printedProfile.valueChanges();
  }


  ngOnInit(): void {
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
    const fan = {
      name: this.modificationForm.value.name,
      phone: this.modificationForm.value.phone,
      email: this.modificationForm.value.email,
      imageSource: this.modificationForm.value.imageurl,
      location: this.modificationForm.value.location,
    };
    /*console.warn(fan.name + ';' +  + ';' + this.formBuilder.group(name).value.name);*/
    /*if (fan.name === '') {
      fan.name.setValue(this.fanProfiles.name);
    }*/
    this.printedProfile.update(fan)
      .catch(error => console.log(error));
    this._success.next('Perfil guardado con exito!');
    this._location.back();
  }

}
