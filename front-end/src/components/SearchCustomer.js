import { useEffect, useState } from 'react';
import useForm from '../hooks/useForm';
import { useHistory } from 'react-router-dom';

const SearchCustomer = () => {
  const [searchResult, setSearchResults] = useState([]);
  const [values, updateValue] = useForm({
    search: '',
  });
  const history = useHistory();
  useEffect(() => {
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
        if (e.name === 'AbortError') {
          return;
        }
        console.error(e);
      }
    };
    result(signal);
    return () => controller.abort();
  }, [values.search]);

  return (
    <form
      onSubmit={(e) => {
        //TODO prevent to redirect if no customer selected
        e.preventDefault();
        history.push(`/customer/${values.search}`);
      }}
    >
      <fieldset>
        <h3 style={{ color: 'white' }}>Search for cusomer</h3>
        <label htmlFor="Search">Type name</label>
        <input
          list="names"
          id="search"
          name="search"
          value={values.search}
          onChange={updateValue}
        />

        <datalist id="names" onChange={(e) => console.log(e)}>
          {searchResult &&
            searchResult.map((cx, i) => (
              <option key={`${cx.DisplayName}--${i}`} value={cx.DisplayName} />
            ))}
        </datalist>
        <input type="submit" />
      </fieldset>
    </form>
  );
};

export default SearchCustomer;
