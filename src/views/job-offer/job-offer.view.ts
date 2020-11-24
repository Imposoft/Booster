import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {JobOffer} from '../../models/jobOffer/job-offer.model';
import {Band} from '../../models/band/band.model';
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.view.html',
  styleUrls: ['./job-offer.view.sass']
})
export class JobOfferView implements OnInit {
  public pathId: string;
  private printedJobOffer: any;
  public jobOfferPost: JobOffer;
  public jobOfferOwner: Band;

  public ownerPathId: string;
  private loggedId: string;
  private printedProfile: any;

  public isButtonVisible = true;
  public isMusician: boolean;

  private _success = new Subject<string>();
  public successMessage = '';

  constructor(private router: Router, private route: ActivatedRoute, private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    // Oferta de trabajo  vacia sobre el que cargar los datos

    this.jobOfferPost = {body: '', exclusive: false, imgUrl: '', owner: undefined, budget: 0, promoted: false, title: '', genres: [], userWaitList: [], endData: '', extraFiles: '', like: ['']};
    this.jobOfferOwner = {description: '', email: '', members: [], genres: [], imageSource: '', jobOffers: [], location: '', name: '', password: '', phone: '', socialNetworks: [], subscription: undefined, subscriptionPrice: 0};

    // Recibimos el id del url de la web o en su defecto utilizamos uno por defecto
    this.route.params.subscribe( params => {
        if (params.id) {
          this.pathId = params.id;
        } else {
          this.pathId = 'dKAmFasidHlD5ZpD9ttP';
        }
        this.printedJobOffer = afs.doc<JobOffer>('jobOfferPosts/' + this.pathId);

        this.afAuth.authState.subscribe(user => {
          if (user){
            this.loggedId = user.uid;
            this.isMusician = user.photoURL === 'MUSICIAN';
          }
          this.printedJobOffer.valueChanges().subscribe((jobOffer) => {
            this.jobOfferPost = jobOffer;
            // Cargamos el usuario owner de la oferta de trabajo
            this.printedProfile = afs.doc<Band>('bandProfiles/' + this.jobOfferPost.owner);
            this.ownerPathId = this.jobOfferPost.owner;
            this.printedProfile.valueChanges().subscribe((band) => {
              this.jobOfferOwner = band;
            });
            this.checkIfApplied();
          });
        });
      }
    );
  }

  ngOnInit(): void {
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(2500)
    ).subscribe(() => this.successMessage = '');
  }

  applyForJobOffer(): void {
    this.isButtonVisible = false;
    this.jobOfferPost.userWaitList.push(this.loggedId);
    this.printedJobOffer.update(this.jobOfferPost);
    this._success.next('Solicitud de trabajo realizada con éxito! ');
  }

  checkIfApplied(): void {
    if (this.isMusician) {
      for (const id of this.jobOfferPost.userWaitList) {
        if (this.loggedId === id) {
          this.isButtonVisible = false;
        }
      }
    } else {
      this.isButtonVisible = false;
    }
  }

  checkIfOwnerLoged(): boolean {
    return this.loggedId === this.ownerPathId;
  }

}
