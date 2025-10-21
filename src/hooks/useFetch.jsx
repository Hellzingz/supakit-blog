import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get(url);
      setData(res.data);
    } catch (error) {
      console.error("API Error:", error);
      if (error.response?.status === 401) {
        setData([]);
        setError(null);
      } else {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);
  
  return { data, isLoading, error, fetchData };
};

export default useFetch;
