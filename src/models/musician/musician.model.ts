import {Profile} from '../profile/profile.model';
import {Genre} from '../genre/genre.model';
import {Subscription} from 'rxjs';
import {JobOffer} from '../jobs/job-offer.model';
import {Instrument} from '../instrument/instrument.model';
import {Tutorial} from '../tutorial/tutorial.model';

export class Musician extends Profile{
  description?: string;
  genres: Genre[];
  subscriptionPrice: number;
  tutorials?: Tutorial[];
  instruments: Instrument[];
  jobOffers?: JobOffer[];
  subscription?: Subscription;
}
