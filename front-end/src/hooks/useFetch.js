const { useState, useEffect } = require('react');

// const useFetch = async (url, ) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

export const useFetch = (url, options) => {
  const [pendingFetch, setPending] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancel = false;

    if (!url) {
      setData(null);
      return;
    }

    const fetchData = async () => {
      setPending(true);
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (!cancel) {
          setData(data);
          setPending(false);
        } else {
          setPending(false);
          setData(null);
        }
      } catch (e) {
        setError(e);
      }
    };

    fetchData();

    return () => (cancel = true);
  }, [url]);

  return { pendingFetch, error, data };
};
export default useFetch;
