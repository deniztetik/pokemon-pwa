import { useState, useEffect } from "react";

const usePromise = (fn: Function, watch = []) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const refresh = async () => {
    try {
      const res = await fn();
      setResult(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, watch);

  return [loading, result, error, refresh];
};

export default usePromise;
