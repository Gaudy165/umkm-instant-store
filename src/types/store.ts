import { Product } from "./product";

export interface Store {
  id?: string;
  name: string;
  tagline?: string;
  description?: string;
  products?: Product[];
  logoUrl?: string;
  ownerId?: string | null;
  createdAt?: string;
}

export type StoreInput = Omit<Store, 'id' | 'createdAt'>;
