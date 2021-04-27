import React, { useContext, useEffect, useReducer } from 'react';
import { reducer, initialState } from '../utils/jobReducer';
import { useHistory } from 'react-router-dom';
import OrderInfo from './OrderInfo';
import { ToastContext } from './Toast';

const CreateJob = ({ customer }) => {
  const history = useHistory();
  const { setMessage } = useContext(ToastContext);
  const updateField = (field) => (e) => {
    dispatch({ type: 'updateValue', field, value: e.target.value });
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  // set customer in the state
  useEffect(() => dispatch({ type: 'setCx', cx: customer._id }), []);

  const url = `${process.env.REACT_APP_DOMAIN}/api/createWorkOrder`;
  const options = {
    credentials: 'include',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state),
  };
  const createOrder = async (e) => {
    e.preventDefault();
    if (state.services.length < 1) {
      setMessage(['error', 'Please add services']);
      return;
    }
    try {
      const res = await fetch(url, options);
      const message = await res.json();
      if (!res.ok) {
        throw Error(message);
      } else {
        setMessage(['success', message]);
        history.push('/dashboard/inProgress');
      }
    } catch (e) {
      setMessage(['error', e.message]);
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
