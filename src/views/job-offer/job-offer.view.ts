import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Tutorial} from '../../models/tutorial/tutorial.model';
import {JobOffer} from '../../models/jobs/job-offer.model';
import {Musician} from '../../models/musician/musician.model';
import {Band} from '../../models/band/band.model';
import {Genre} from '../../models/genre/genre.model';

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.view.html',
  styleUrls: ['./job-offer.view.sass']
})
export class JobOfferView implements OnInit {
  public pathId: string;
  private printedJobOffer: any;
  public jobOffer: JobOffer;
  public jobOfferOwner: Band;

  public userPathId: string;
  private loggedId: string;
  private printedProfile: any;

  constructor(private router: Router, private route: ActivatedRoute, private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    // Oferta de trabajo  vacia sobre el que cargar los datos

    // this.jobOffer = {body: '', exclusive: false, imgUrl: '', owner: undefined, budget: 0, promoted: false, title: '', genres: [], musician: [], band: [], endData: '', extraFiles: ''};
    // this.jobOfferOwner = {description: '', email: '', members: Musician[], genres: [], imageSource: '', instruments: [], jobOffers: [], location: '', name: '', password: '', phone: '', socialNetworks: [], subscription: undefined, subscriptionPrice: 0, tutorials: []};

    // Recibimos el id del url de la web o en su defecto utilizamos uno por defecto
    this.route.params.subscribe( params => {
        if (params.id) {
          this.pathId = params.id;
        } else {
          this.pathId = 'NKUHb5YBHaCDQmSpWUFh';
        }

      // this.printedJobOffer = afs.

     /* this.printedJobOffer.valueChanges().subscribe(() => {
        this.jobOffer = ;
      }); */
      }
    );

    // Cargamos el usuario owner de la oferta de trabajo
    this.printedProfile = afs.doc<Band>('bandProfile/n6ZhZ1TJI7iayJS4GQrc');
    this.userPathId = 'n6ZhZ1TJI7iayJS4GQrc';
    this.printedProfile.valueChanges().subscribe((band) => {
      this.jobOfferOwner = band;
    });

  }

  ngOnInit(): void {
  }

}
