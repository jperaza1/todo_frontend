import { useState, useEffect } from "react";

const useFetch = (url, options) => {
  const [isloading, setIsLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const doFetch = async () => {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      setResult(json);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    doFetch();
  }, [options, url]);

  return {
    isloading,
    result,
    error,
    doFetch: doFetch
  };
};

export default useFetch;
