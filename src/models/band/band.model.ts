import {Profile} from '../profile/profile.model';
import {Musician} from '../musician/musician.model';
import {Genre} from '../genre/genre.model';

export class Band extends Profile{
  description?: string;
  members: [Musician];
  genres: [Genre];
  subscriptionPrice: number;
  // auditions?: [Audition];
  // lista de ofertas de trabajo a las que se suscribe
  // jobOffers?: [JobOffer];
  // subscription?: Subscription;
}
