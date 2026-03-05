import { useState } from "react";

export const useGenerateStore = () => {
  const [loading, setLoading] = useState(false);
  return { loading };
};
