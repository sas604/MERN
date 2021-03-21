import { useReducer, useState } from 'react';
import CustomerForm from './CustomerForm';
import { initialState, reducer } from '../utils/customerReducer';
import { useHistory } from 'react-router';

const CreateCustomer = () => {
  const [status, setStatus] = useState('idle');
  const [values, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const updateValue = (field) => (e) => {
    dispatch({ type: 'updateValue', field, value: e.target.value });
  };

  const url = 'http://localhost:5000/api/createcustomer';
  // options for the fetch
  const options = {
    credentials: 'include',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  };
  // handle form submit
  const createCx = async (e) => {
    e.preventDefault();
    setStatus({ status: 'loading', msg: 'loading' });
    try {
      const res = await fetch(url, options);
      const msg = await res.json();
      if (!res.ok) {
        throw new Error(
          'Something went wrong while creating new customer. Make sure that cx name is unique'
        );
      }
      history.replace(`customer/${values.DisplayName}`);

      setStatus({ status: 'success', msg });
    } catch (e) {
      setStatus({ status: 'error', msg: e.message });
    }
  };
  return (
    <div className="max-width">
      {status !== 'idle' && <h6>{status.msg}</h6>}
      <h2>Create a new customer</h2>
      <form onSubmit={createCx}>
        <CustomerForm
          values={values}
          dispatch={dispatch}
          updateValue={updateValue}
        />
        <button
          style={{ marginBottom: 16 }}
          type="submit"
          className="button button--blue button--block"
        >
          Update
        </button>
        <button
          className="button button--red button--block"
          type="button"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateCustomer;
