export class Profile {
  name: string;
  email: string;
  password: string;
  imageSource: string;
  location: string;
  phone: string;
  socialNetworks: Map<SocialNetwork, string>;
}

export enum SocialNetwork {
  INSTRAGRAM,
  FACEBOOK,
  TWITTER,
  REDDIT
}
