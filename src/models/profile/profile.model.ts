export class Profile {
  name: string;
  email: string;
  password: string;
  imageSource: string;
  location: string;
  role: Roles;
  description: string;
}

export enum Roles {
  fan,
  musician,
  band
}
