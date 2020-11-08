import {Post} from '../post/post.model';
import {UserDetails} from '../userDetails/user-details.model';

export class Tutorial extends Post{
  price?: number;
  userWaitList: UserDetails[];
  id?: string;
}
