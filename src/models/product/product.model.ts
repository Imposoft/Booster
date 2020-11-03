import {Profile} from '../profile/profile.model';

export class Product {
  title: string;
  description: string;
  price: number;
  stock: number;
  profile: [Profile];
}
