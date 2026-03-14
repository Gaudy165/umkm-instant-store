export interface Product {
  id?: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ProductInput = Omit<Product, 'id' | 'createdAt'>;
