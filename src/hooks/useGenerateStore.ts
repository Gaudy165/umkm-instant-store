import { useState } from "react";
import { createStore } from "@/lib/storeService";
import { Store } from "@/types/store";

export const useGenerateStore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateStore = async (data: Store, userId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const storeId = await createStore(data, userId);
      return storeId;
    } catch (err) {
      console.error("Error generating store:", err);
      setError("Failed to generate store. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, generateStore };
};
