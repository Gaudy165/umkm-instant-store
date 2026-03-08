import { Product } from "./product";

export interface Store {
  id?: string;
  name: string;
  tagline?: string;
  description?: string;
  products?: Product[];
  logoUrl?: string;
  ownerId?: string;
  createdAt?: Date;
}
