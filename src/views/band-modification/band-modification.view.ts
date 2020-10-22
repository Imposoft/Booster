import { Component, OnInit } from '@angular/core';
import {Band} from '../../models/band/band.model';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {SocialNetworkEnum} from '../../models/socialnetworks/socialnetworks.model';

@Component({
  selector: 'app-band-modification',
  templateUrl: './band-modification.view.html',
  styleUrls: ['./band-modification.view.sass']
})
export class BandModificationView implements OnInit {

  profile: Band;
  items: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('test').valueChanges();
  }

  ngOnInit(): void {
    this.profile = {
      name: 'Rammstein',
      description: 'We are Rammstein, lol no jk \n\n Rammstein (pronunciación en alemán: /\'ʁamʃta͡ɪn/) es una banda alemana de metal industrial formada en 1994 por los músicos Till Lindemann, Richard Z. Kruspe, Oliver Riedel, Paul Landers, Christian Lorenz y Christoph Schneider.2​ Su música se basa en una corriente surgida en su país en los años 1990 llamada Neue Deutsche Härte del que son su exponente más popular y al que también pertenecen, entre otros, Oomph! y Die Krupps. Ellos mismos han denominado en alguna ocasión esta mezcla con el apelativo de Tanzmetall («metal de baile»).3​4​\n\n Sus canciones están escritas casi exclusivamente en alemán aunque se pueden encontrar en inglés, francés, ruso e incluso español; y han vendido más de 50 millones de copias en todo el mundo.2​Entre otros reconocimientos, han sido nominados en dos ediciones de los premios Grammy en la categoría de mejor interpretación de metal: en 1999 con el tema «Du hast» (del álbum Sehnsucht) y en 2006 con «Mein Teil» (del álbum Reise, Reise).2​Han lanzado al mercado un total de siete álbumes de estudio y cuatro en directo, así como cinco DVD; toda su discografía se encuentra disponible en el catálogo de la multinacional discográfica Universal Music.',
      email: 'test@email.com',
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
      subscriptionPrice: 0
    };
  }

}
