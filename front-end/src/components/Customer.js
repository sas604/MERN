import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import CustomerInfo from './CustomerInfo';
import set from 'lodash/set';

const initialState = {
  FullyQualifiedName: '',
  FamilyName: '',
  GivenName: '',
  PrimaryEmailAddr: {
    Address: '',
  },
  DisplayName: '',
  Suffix: '',
  Title: '',
  MiddleName: '',
  PrimaryPhone: {
    FreeFormNumber: '',
  },
  CompanyName: '',
  BillAddr: {
    CountrySubDivisionCode: '',
    City: '',
    PostalCode: '',
    Line1: '',
    Line2: '',
    Country: '',
  },
  ShipAddr: {
    CountrySubDivisionCode: '',
    City: '',
    PostalCode: '',
    Line1: '',
    Line2: '',
    Country: '',
  },
  Id: '',
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'updateValue':
      return { ...set(state, action.field, action.value) };
    case 'load':
      return {
        ...action.data,
      };
    default:
      return initialState;
  }
};
const Customer = () => {
  const [edit, setEdit] = useState(false);
  const { name } = useParams();
  const options = {
    credentials: 'include',
  };

  // get user from the server
  const url = `http://localhost:5000/api/get/${name}`;
  const [pendingFetch, error, data] = useFetch(url, options, edit);

  // post  data to server
  const postUri = 'http://localhost:5000/api/updatesinglecx';
  const [postOptions, setPostOptions] = useState(false);
  const [pendingPost, postError, postData] = useFetch(
    postUri,
    postOptions,
    postOptions.body
  );
  // reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateField = (field) => (e) => {
    dispatch({ type: 'updateValue', field, value: e.target.value });
  };
  // set data to reducer when it loads
  useEffect(() => {
    if (!data) return;
    dispatch({ type: 'load', data });
  }, [data]);

  if (pendingFetch || !data) return <h1>Loading...</h1>;
  if (error) return <h1>Oh snap errror</h1>;

  return (
    <>
      <button type="button" onClick={() => setEdit(true)}>
        Edit
      </button>
      <CustomerInfo
        readOnly={!edit}
        values={state} // should be cx object
        updateValue={updateField}
      />
      {edit && (
        <>
          <button
            type="button"
            onClick={() =>
              setPostOptions({
                credentials: 'include',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state),
              })
            }
          >
            Update
          </button>
          <button type="button" onClick={() => setEdit(false)}>
            Cancel
          </button>
        </>
      )}
    </>
  );
};

export default Customer;
