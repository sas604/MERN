import React, { useEffect, useReducer, useState } from 'react';
import CustomerInfo from './CustomerInfo';
import { reducer, initialState } from '../utils/jobReducer';

import { useHistory } from 'react-router-dom';
import OrderInfo from './OrderInfo';

const CreateJob = ({ customer }) => {
  const { history } = useHistory();

  const updateField = (field) => (e) => {
    dispatch({ type: 'updateValue', field, value: e.target.value });
  };
  const [state, dispatch] = useReducer(reducer, initialState);
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
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        console.log(e);
        setError(e);
      } else {
        console.log(res);
      }
    } catch (e) {
      setError(e);
    }
  };

  return (
    <form onSubmit={createOrder}>
      <CustomerInfo readOnly values={customer} />
      <OrderInfo dispatch={dispatch} state={state} updateField={updateField} />
      <input type="submit" value="Create New Work Order" />
    </form>
  );
};

export default CreateJob;
