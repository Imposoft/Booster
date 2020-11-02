import {SocialNetworks} from '../socialnetworks/socialnetworks.model';

export class Profile {
  name: string;
  email: string;
  password: string;
  imageSource: string;
  location: string;
  phone: string;
  socialNetworks: SocialNetworks[];
}
