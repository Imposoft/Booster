import {Post} from '../post/post.model';
import {UserDetails} from '../userDetails/user-details.model';

export class Tutorial extends Post{
  title: string;
  description?: string;
  price?: number;
  userWaitList: UserDetails[];
}
