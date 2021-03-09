const { useState, useEffect } = require('react');

export const useFetch = (url, options, refetch) => {
  const [pendingFetch, setPending] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!options) return;
    let cancel = false;

    if (!url) {
      setData(null);
      return;
    }

    const fetchData = async () => {
      setPending(true);
      try {
        const response = await fetch(url, options, refetch);
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
  }, [url, refetch]);

  return [pendingFetch, error, data];
};
export default useFetch;
