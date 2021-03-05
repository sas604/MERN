const { useState } = require('react');

const useFetch = async (url, options) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const controller = new AbortController();
  const { signal } = controller;

  function init() {
    setData([]);
    setLoading(true);
    setLoading(false);
  }

  async function load() {
    init();
    setLoading(true);
    try {
      const result = await fetch(url, { signal, options });
      setData(result);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  }

  return { data, loading, error, load, controller };
};

export default useFetch;
