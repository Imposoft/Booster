import { Component, OnInit } from '@angular/core';
import {Band} from '../../models/band/band.model';
import {Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {SocialNetworkEnum} from '../../models/socialnetworks/socialnetworks.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

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

  constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore, private router: Router, private route: ActivatedRoute) {
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
    this.profile.subscribe(value => {
      this.nameModification = value.name;
      this.phoneModification = value.phone;
      this.emailModification = value.email;
      this.psswModification = value.password;
      this.imageModification = value.imageSource;
      this.locModification = value.location;
      this.descModification = value.description;
      this.subsModification = value.subscriptionPrice;
    });
    this.modificationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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
  }

  checkValues(): void {
    if (this.modificationForm.value.name !== ''){ this.nameModification = this.modificationForm.value.name; }
    if (this.modificationForm.value.phone !== ''){ this.phoneModification = this.modificationForm.value.phone; }
    if (this.modificationForm.value.email !== ''){ this.emailModification = this.modificationForm.value.email; }
    if (this.modificationForm.value.password !== ''){ this.psswModification = this.modificationForm.value.password; }
    if (this.modificationForm.value.imageurl !== ''){ this.imageModification = this.modificationForm.value.imageurl; }
    if (this.modificationForm.value.location !== ''){ this.locModification = this.modificationForm.value.location; }
    if (this.modificationForm.value.description !== ''){ this.descModification = this.modificationForm.value.description; }
    if (this.modificationForm.value.subscriptionPrice !== ''){ this.subsModification = this.modificationForm.value.subscriptionPrice; }
  }

  changeView(): void {
    this.successMessage = '';
    this.router.navigate([this.path]);
  }
}
