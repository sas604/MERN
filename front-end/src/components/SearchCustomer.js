import { useEffect, useState } from 'react';
import useForm from '../hooks/useForm';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

const SearchCustomerStyles = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 0 0.5rem;
  position: relative;

  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }

  label {
    font-size: 1.2rem;
    display: block;

    span {
      display: block;
      margin-bottom: 0.5rem;
    }
    input {
      width: 100%;
    }
  }
  form + div {
    margin-top: 5rem;
  }
  .active {
    border: 0;
    background-color: var(--black);
    color: var(--white);
    text-decoration: none;
    padding: 0.5rem 1rem;
    display: block;
    text-align: center;
    font-size: 1.3rem;
    transition: all cubic-bezier(0.39, 0.575, 0.565, 1) 0.2s;
    &:hover {
      transform: scale(1.05);
    }
  }

  .results > * {
    margin-top: 0.4rem;
  }
  .results {
    position: absolute;
    width: 100%;
    max-height: 70vh;
    overflow-y: scroll;
    background-color: var(--white);
  }
  .clear-search {
    background: none;
    border: none;
    outline: none;
    position: absolute;
    right: 0;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

const SearchItemStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  background-color: white;
  padding: 0.5rem 1rem;
  color: var(--black);
  text-decoration: none;
  &:hover {
    background-color: var(--gray);
    .desc {
      color: var(--black);
    }
  }
  > * {
    margin: 0;
    flex: 50%;
  }
  > * + * {
    margin-top: 0.5rem;
  }
  & :first-child {
    flex: 100%;
  }
  .desc {
    display: block;
    font-size: 0.8rem;
    color: var(--gray);
  }
`;
const SearchCustomer = () => {
  const [searchResult, setSearchResults] = useState([]);
  const [values, updateValue, reset] = useForm({
    search: '',
  });
  const history = useHistory();
  useEffect(() => {
    if (!values.search) {
      setSearchResults([]);
      return;
    }
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
    <SearchCustomerStyles>
      <h2>Search for cusomer</h2>
      <form
        onSubmit={(e) => {
          //TODO prevent to redirect if no customer selected
          e.preventDefault();
          history.push(`/customer/${values.search}`);
        }}
      >
        {values.search && (
          <button
            className="clear-search"
            type="button"
            onClick={() => {
              setSearchResults([]);
              reset();
            }}
          >
            <MdClose />
          </button>
        )}
        <label htmlFor="Search">
          <span>Type name:</span>
          <input
            list="names"
            id="search"
            name="search"
            value={values.search}
            onChange={updateValue}
          />
        </label>
        <div className="results">
          {searchResult.map((cx, i) => (
            <SearchItemStyle as={Link} to={`/customer/${cx.DisplayName}`}>
              <p>
                <span className="desc">Display name: </span>
                {cx.DisplayName}
              </p>
              <p>
                <span className="desc">tel: </span>
                {cx.PrimaryPhone?.FreeFormNumber}
              </p>
              <p>
                <span className="desc">Company: </span>
                {cx.CompanyName}
              </p>
            </SearchItemStyle>
          ))}
        </div>
      </form>
      <div>
        <h2> Or create a new one </h2>
        <Link className="active" to="/CreateCustomer">
          Create a new customer
        </Link>
      </div>
    </SearchCustomerStyles>
  );
};

export default SearchCustomer;
