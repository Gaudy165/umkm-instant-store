import { AIRequestBody } from "@/types/ai";

export const generateStoreAI = async (concept: string) => {
  const response = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: concept,
      type: "store-info",
    } as AIRequestBody),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to generate store info");
  }

  return response.json();
};

export const generateProductsAI = async (concept: string) => {
  const response = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: concept,
      type: "product-list",
    } as AIRequestBody),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to generate products");
  }

  return response.json();
};
