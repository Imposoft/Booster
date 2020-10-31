import { Component, OnInit } from '@angular/core';
import {Band} from '../../models/band/band.model';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute, Router} from '@angular/router';
import {UserDetails} from '../../models/userDetails/user-details.model';
import {Musician} from '../../models/musician/musician.model';

@Component({
  selector: 'app-band',
  templateUrl: './band.view.html',
  styleUrls: ['./band.view.sass']
})
export class BandView implements OnInit {

  profile: Band;
  items: Observable<any[]>;
  bandProfiles;
  printedProfile: any;

  members: Musician[];

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
    this.members =
      [{name: 'Peter Parker',
        phone: '',
        password: '',
        location: '',
        jobOffers: null,
        instruments: null,
        genres: null,
        email: 'email',
        description: '',
        imageSource: 'https://www.google.com/search?q=person+images&client=firefox-b-d&hl=es&sxsrf=ALeKk02rmH7jGYA16TkFfevUN6AuJkTR3g:1604180387208&tbm=isch&source=iu&ictx=1&fir=f3DPaclIKtdShM%252CNkC29UP8iMFKiM%252C_&vet=1&usg=AI4_-kQZqGuLjzU0iUBtNVJQqtQPsgy7Rw&sa=X&ved=2ahUKEwjd7onR5d_sAhXdAGMBHY0zA9EQ9QF6BAgFEDs&biw=1920&bih=966#imgrc=f3DPaclIKtdShM',
        socialNetworks: [],
        subscription: null,
        subscriptionPrice: 25,
        tutorials: null},
        {name: 'El tio de Peter Parker',
          phone: '',
          password: '',
          location: '',
          jobOffers: null,
          instruments: null,
          genres: null,
          email: 'email',
          description: '',
          imageSource: 'https://www.google.com/search?q=person+images&client=firefox-b-d&hl=es&sxsrf=ALeKk02rmH7jGYA16TkFfevUN6AuJkTR3g:1604180387208&tbm=isch&source=iu&ictx=1&fir=f3DPaclIKtdShM%252CNkC29UP8iMFKiM%252C_&vet=1&usg=AI4_-kQZqGuLjzU0iUBtNVJQqtQPsgy7Rw&sa=X&ved=2ahUKEwjd7onR5d_sAhXdAGMBHY0zA9EQ9QF6BAgFEDs&biw=1920&bih=966#imgrc=fxrC0kpSTRq7gM',
          socialNetworks: [],
          subscription: null,
          subscriptionPrice: 25,
          tutorials: null}];
  }

  ngOnInit(): void {
  }
}
