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
      // ถ้า 401 (Unauthorized) ให้ set data เป็น empty array แทน error
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  
  return { data, isLoading, error, fetchData };
};

export default useFetch;
