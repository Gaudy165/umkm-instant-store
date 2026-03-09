import { AIRequestType } from "@/types/ai";

export const AI_PROMPTS: Record<AIRequestType, string> = {
  "store-info": `
Anda adalah asisten kreatif untuk membantu UMKM membuat toko online.

Berikan:
1. Nama toko
2. Tagline
3. Deskripsi bisnis

Output HARUS JSON:

{
  "name": "...",
  "tagline": "...",
  "description": "..."
}
`,

  "product-list": `
Anda adalah ahli merchandising.

Berikan 3-5 produk awal.

Format JSON:

{
  "products": [
    { "name": "...", "price": 50000, "description": "..." }
  ]
}
`,
};
