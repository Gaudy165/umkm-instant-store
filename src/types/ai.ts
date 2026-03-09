export type AIRequestType = "store-info" | "product-list";

export interface AIRequestBody {
  prompt: string;
  type: AIRequestType;
}
