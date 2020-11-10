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

  private printedProfile: any;
  public profile: Fan;
  private pathId: string;

  public modificationForm: FormGroup;

  private _success = new Subject<string>();
  successMessage = '';

  private modName: any;
  private modEmail: any;
  private modPassword: any;
  private modImage: any;
  private modLocation: any;
  private modPhone: any;
  private modSocial: any;

  constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore, private router: Router, private route: ActivatedRoute) {
    // Perfil vacio sobre el que cargar los datos
    this.profile = {email: '', imageSource: '', location: '', name: '', password: '', phone: '', socialNetworks: []};

    // Recibimos el id del url de la web o en su defecto utilizamos uno por defecto
    this.route.params.subscribe( params => {
      if (params.id) {
        this.pathId = params.id;
      } else {
        this.pathId = 'NKUHb5YBHaCDQmSpWUFh';
      }
      // Cargamos el perfil sobre el perfil vacio
      this.printedProfile = firestore.doc<Fan>('fanProfiles/' + this.pathId);
      this.printedProfile.valueChanges().subscribe((fan) => {
        this.profile = fan;
        this.profile.socialNetworks = fan.socialNetworks;
      });
    });
  }


  ngOnInit(): void {
    this.modificationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      imageurl: ['', [Validators.required]],
      location: ['', []],
      phone: ['', [Validators.required]],
    });

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');
  }

  sendForm(): void {
    this.checkValues();
    this.printedProfile.update(this.profile)
      .catch(error => console.log(error));
    this._success.next('Perfil guardado con exito!');
    this.changeView();
  }
  checkValues(): void {
    if (this.modificationForm.value.name !== ''){ this.profile.name = this.modificationForm.value.name; }
    if (this.modificationForm.value.phone !== ''){ this.profile.phone = this.modificationForm.value.phone; }
    if (this.modificationForm.value.email !== ''){ this.profile.email = this.modificationForm.value.email; }
    if (this.modificationForm.value.password !== ''){ this.profile.password = this.modificationForm.value.password; }
    if (this.modificationForm.value.imageurl !== ''){ this.profile.imageSource = this.modificationForm.value.imageurl; }
    if (this.modificationForm.value.location !== ''){ this.profile.location = this.modificationForm.value.location; }
  }

  changeView(): void {
    this.successMessage = '';
    this.router.navigate(['fanProfile/' + this.pathId]);
  }
}
