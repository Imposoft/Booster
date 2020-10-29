import { Component, OnInit } from '@angular/core';
import {Band} from '../../models/band/band.model';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
<<<<<<< Updated upstream
import {SocialNetworkEnum} from '../../models/socialnetworks/socialnetworks.model';
import {Musician} from '../../models/musician/musician.model';
=======
import {ActivatedRoute, Router} from '@angular/router';
import {Profile} from '../../models/profile/profile.model';
>>>>>>> Stashed changes

@Component({
  selector: 'app-band',
  templateUrl: './band.view.html',
  styleUrls: ['./band.view.sass']
})
export class BandView implements OnInit {

  profile: Band;
  items: Observable<any[]>;
<<<<<<< Updated upstream

  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('test').valueChanges();
=======
  bandProfiles;
  printedProfile: any;
  members: Profile[];

  constructor(private router: Router, private route: ActivatedRoute, firestore: AngularFirestore) {
    this.route.params.subscribe( params => {
        if (params.id) {
          console.log(params);
          this.printedProfile = firestore.doc<Band>('bandProfiles/' + params.id);
        } else {
          console.log(params);
          this.printedProfile = firestore.doc<Band>('bandProfiles/CBaWe62HROxtyWDY050Y');
        }
      }
    );
    this.profile = this.printedProfile.valueChanges();
    this.members = [{socialNetworks: null,
      phone: '12341512',
      location: 'test',
      imageSource: 'https://firebasestorage.googleapis.com/v0/b/booster-dceeb.appspot.com/o/temp%2Fblank-profile-picture-973460_640.png?alt=media&token=abf85b4d-7827-44d2-8bc3-8ee90964b4e9',
      password: '1234512',
      email: '123123',
      name: 'pepe'}];

>>>>>>> Stashed changes
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
      members: [],
      subscriptionPrice: 0
    };
  }

}
