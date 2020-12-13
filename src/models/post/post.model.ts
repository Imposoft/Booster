import {UserDetails} from '../userDetails/user-details.model';
import {Like} from '../like/like.model';

export class Post {
  id?: string;
  title: string;
  body: string;
  promoted: boolean;
  exclusive: boolean;
  imgUrl: string;
  owner: string;
  creation?: string;
  likes?: Like[];
}
