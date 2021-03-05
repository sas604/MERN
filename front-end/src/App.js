import logo from './logo.svg';
import './App.css';

import useForm from './hooks/useForm';

import { useEffect, useState } from 'react';

function App() {
  const { values, updateValue } = useForm({
    search: '',
  });
  const [searchResult, setSearchResults] = useState([]);

  useEffect(() => {
    if (!values.search) return;
    const controller = new AbortController();
    const { signal } = controller;
    const result = async (signal) => {
      try {
        const result = await fetch('http://localhost:5000/api/search', {
          signal,
          credentials: 'include',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: values.search }),
        });
        const body = await result.json();
        setSearchResults(body);
      } catch (e) {
        console.error(e);
      }
    };
    result(signal);
    return () => controller.abort();
  }, [values.search]);

  console.log(searchResult);
  return (
    <div className="App">
      <header className="App-header">
        <form>
          <label htmlFor="search">
            Search
            <input
              type="text"
              name="search"
              onChange={updateValue}
              value={values.search}
            />
          </label>
          <input type="submit" />
        </form>
        <button
          onClick={() =>
            fetch('http://localhost:5000/api/login')
              .then((response) => response.json())
              .then((res) => (window.location = res))
          }
        >
          log to quickbooks
        </button>
      </header>
    </div>
  );
}

export default App;
