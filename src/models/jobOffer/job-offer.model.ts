import {Genre} from '../genre/genre.model';
import {Post} from '../post/post.model';
import {Band} from '../band/band.model';
import {Musician} from '../musician/musician.model';

export class JobOffer extends Post {
  genres: Genre[];
  budget: number;
  extraFiles: string;
  endData: string;
  // contractor: Contractor[];
  userWaitList: string[];
}
