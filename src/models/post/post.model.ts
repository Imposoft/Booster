import {UserDetails} from '../userDetails/user-details.model';

export class Post {
  id?: string;
  title: string;
  body: string;
  promoted: boolean;
  exclusive: boolean;
  imgUrl: string;
  owner: string;
  creation?: string;
}
