import { Component, OnInit } from '@angular/core';
import {Band} from '../../models/band/band.model';
import {Observable, Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {SocialNetworkEnum} from '../../models/socialnetworks/socialnetworks.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-band-modification',
  templateUrl: './band-modification.view.html',
  styleUrls: ['./band-modification.view.sass']
})
export class BandModificationView implements OnInit {

  profile: Band;
  bandProfiles;
  printedProfile: any;
  modificationForm: FormGroup;
  items: Observable<any[]>;

  private _success = new Subject<string>();
  successMessage = '';

  constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore) {
    this.bandProfiles = firestore.collection<Band>('bandProfiles');
    this.bandProfiles = firestore.collection<Band>('bandProfiles');
    this.printedProfile = firestore.doc<Band>('bandProfiles/CBaWe62HROxtyWDY050Y');
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
    const band = {
      name: this.modificationForm.value.name,
      email: this.modificationForm.value.email,
      password: this.modificationForm.value.password,
      imageSource: this.modificationForm.value.imageurl,
      phone: this.modificationForm.value.phone,
      members: this.modificationForm.value.members,
      description: this.modificationForm.value.description,
      genres: [{name: 'Heavy'}, {name: 'Pop'}],
      location: this.modificationForm.value.location,
      socialNetworks: [{socialNetwork: SocialNetworkEnum.TWITTER, url: 'https://twitter.com/BTS_twt'},
        {socialNetwork: SocialNetworkEnum.INSTRAGRAM, url: 'https://www.instagram.com/bts.bighitofficial/'}],
      subscriptionPrice: this.modificationForm.value.subscriptionPrice
    };
    this.printedProfile.update(band)
      .catch(error => console.log(error));
    this._success.next('Perfil guardado con exito!');
  }

}
