import React, { useEffect, useReducer, useState } from 'react';
import { reducer, initialState } from '../utils/jobReducer';
import { useHistory } from 'react-router-dom';
import OrderInfo from './OrderInfo';

const CreateJob = ({ customer }) => {
  const history = useHistory();

  const updateField = (field) => (e) => {
    dispatch({ type: 'updateValue', field, value: e.target.value });
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  // set customer in the state
  useEffect(() => dispatch({ type: 'setCx', cx: customer._id }), []);
  const [error, setError] = useState(false);
  const url = `http://localhost:5000/api/createWorkOrder`;
  const options = {
    credentials: 'include',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state),
  };
  const createOrder = async (e) => {
    e.preventDefault();
    if (state.services.length < 1) {
      setError('Please add services');
      return;
    }
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw Error('Cant Create Work Order');
      } else {
        history.push('/dashboard/inProgress');
      }
    } catch (e) {
      setError(e);
    }
  };

  return (
    <form onSubmit={createOrder}>
      <h2>New Work Order for - {customer.DisplayName}</h2>
      <OrderInfo dispatch={dispatch} state={state} updateField={updateField} />
      <input type="submit" className="button" value="Create New Work Order" />
      <button
        style={{ marginLeft: 25, cursor: 'pointer' }}
        type="button"
        onClick={() => history.goBack()}
        className="button button--red"
      >
        Cancel
      </button>
    </form>
  );
};

export default CreateJob;
