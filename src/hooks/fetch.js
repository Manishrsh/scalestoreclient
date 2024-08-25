import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // To prevent setting state on unmounted component
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, options);
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to prevent memory leaks
    };
  }, [url]); // Ensure options are not being recreated on every render

  return { data, loading, error };
};

export default useFetchData;
