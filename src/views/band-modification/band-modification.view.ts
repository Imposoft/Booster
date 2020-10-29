import { Component, OnInit } from '@angular/core';
import {Band} from '../../models/band/band.model';
import {Observable, Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {SocialNetworkEnum} from '../../models/socialnetworks/socialnetworks.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {SocialNetwork} from '../../models/profile/profile.model';
import {Fan} from '../../models/fan/fan.model';

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
    /* this.profile = {
      name: 'Rammstein',
      description: 'We are Rammstein, lol no jk \n\n Rammstein (pronunciación en alemán: /\'ʁamʃta͡ɪn/) es una banda alemana de metal industrial formada en 1994 por los músicos Till Lindemann, Richard Z. Kruspe, Oliver Riedel, Paul Landers, Christian Lorenz y Christoph Schneider.2​ Su música se basa en una corriente surgida en su país en los años 1990 llamada Neue Deutsche Härte del que son su exponente más popular y al que también pertenecen, entre otros, Oomph! y Die Krupps. Ellos mismos han denominado en alguna ocasión esta mezcla con el apelativo de Tanzmetall («metal de baile»).3​4​\n\n Sus canciones están escritas casi exclusivamente en alemán aunque se pueden encontrar en inglés, francés, ruso e incluso español; y han vendido más de 50 millones de copias en todo el mundo.2​Entre otros reconocimientos, han sido nominados en dos ediciones de los premios Grammy en la categoría de mejor interpretación de metal: en 1999 con el tema «Du hast» (del álbum Sehnsucht) y en 2006 con «Mein Teil» (del álbum Reise, Reise).2​Han lanzado al mercado un total de siete álbumes de estudio y cuatro en directo, así como cinco DVD; toda su discografía se encuentra disponible en el catálogo de la multinacional discográfica Universal Music.',
      email: 'rammstein@email.com',
      password: '1234512345',
      imageSource: 'assets/band/Rammstein-logo.png',
      location: 'Marbella',
      phone: '656121212',
      socialNetworks: [{socialNetwork: SocialNetworkEnum.FACEBOOK, url: 'https://www.facebook.com/'},
        {socialNetwork: SocialNetworkEnum.TWITTER, url: 'https://www.twitter.com/'},
        {socialNetwork: SocialNetworkEnum.INSTRAGRAM, url: 'https://www.instagram.com/'},
        {socialNetwork: SocialNetworkEnum.REDDIT, url: 'https://www.reddit.com/'}],
      genres: [{name: 'Heavy'}, {name: 'Pop'}],
      members: [undefined],
      subscriptionPrice: 12.50
    }; */
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
