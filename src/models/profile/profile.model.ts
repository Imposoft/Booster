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

export enum SocialNetwork {
  INSTRAGRAM = 'INSTRAGRAM',
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  REDDIT = 'REDDIT'
}

const enumAsArray = Object.values(SocialNetwork);
enumAsArray.splice(0, enumAsArray.length / 2);
