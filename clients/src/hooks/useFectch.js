import React, { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fectData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setError(res.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fectData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setError(res.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch};
};

export default useFetch;