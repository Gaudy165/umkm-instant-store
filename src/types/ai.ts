export type AIRequestType = "store-info" | "product-list";

export interface AIRequestBody {
  prompt: string;
  type: AIRequestType;
}

export interface AIStoreResponse {
  name: string;
  tagline: string;
  description: string;
}

export interface AIProductResponse {
  products: {
    name: string;
    price: number;
    description: string;
  }[];
}
