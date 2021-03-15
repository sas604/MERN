import React, { useEffect, useReducer, useState } from 'react';
import CustomerInfoNoEdit from './CustomerInfoNoEdit';
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
        console.log(e);
        setError(e);
      } else {
        await history.push('/dashboard/inProgress');
        console.log(history);
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
    </form>
  );
};

export default CreateJob;
