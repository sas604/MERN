import React, { useEffect, useReducer, useState } from 'react';
import useForm from '../hooks/useForm';
import AddService from './AddService';
import CustomerInfo from './CustomerInfo';
import Service from './Service';
import set from 'lodash/set';
import { useHistory } from 'react-router-dom';

const initialState = {
  customer: '',
  year: '',
  make: '',
  model: '',
  totalParts: '',
  color: '#000000',
  date: '',
  recived: '',
  shiping: '',
  services: [
    { name: 'MP', parts: 'shaft', done: false },
    { name: 'TR', parts: 'All', done: false },
    { name: 'VB', parts: 'Gears, shaft', done: false },
  ],
  invoice: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateValue':
      return { ...set(state, action.field, action.value) };
    case 'setCx':
      return { ...state, customer: action.cx };
    case 'addService':
      action.close();
      return { ...state, services: [...state.services, { ...action.form }] };
    case 'removeService':
      return {
        ...state,
        services: state.services.filter(
          (el) => el !== state.services[action.index]
        ),
      };

    default:
      return;
  }
};
const CreateJob = ({ customer }) => {
  const { history } = useHistory();
  const [servicesModal, setServicesModal] = useState(false);
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
      <div className="work-order">
        <h2>Work Oder Info</h2>
        <fieldset>
          <label htmlFor="year">
            YEAR
            <input
              type="number"
              name="year"
              value={state.year}
              max="2200"
              onChange={updateField('year')}
            />
          </label>
          <label htmlFor="make">
            MAKE
            <input
              type="text"
              name="make"
              value={state.make}
              onChange={updateField('make')}
            />
          </label>
          <label htmlFor="model">
            MODEL
            <input
              type="text"
              name="model"
              value={state.model}
              onChange={updateField('model')}
            />
          </label>
        </fieldset>
        <fieldset className="service" style={{ position: 'relative' }}>
          {servicesModal && (
            <AddService
              dispatch={dispatch}
              close={() => setServicesModal(false)}
            />
          )}
          <h3>Service to be performed </h3>
          {state.services.map((service, i) => (
            <Service
              key={i}
              dispatch={dispatch}
              name={service.name}
              parts={service.parts}
              index={i}
            />
          ))}
          <button type="button" onClick={() => setServicesModal(true)}>
            ADD +
          </button>
        </fieldset>
      </div>

      <fieldset className="office-use">
        <label>
          Total Parts
          <input
            type="number"
            name="totalParts"
            value={state.totalParts}
            onChange={updateField('totalParts')}
          />
        </label>
        <label>
          Date Recived
          <input
            type="date"
            name="date"
            value={state.date}
            onChange={updateField('date')}
          />
        </label>
        <label>
          Color Tag
          <input
            type="color"
            name="color"
            value={state.color}
            onChange={updateField('color')}
          />
        </label>
        <p>Recived By</p>
        <label>
          Shiped
          <input
            type="radio"
            name="recived"
            value="shiped"
            onChange={updateField('recived')}
          />
        </label>
        <label>
          Drop off
          <input
            checked
            type="radio"
            name="recived"
            value="dropoff"
            onChange={updateField('recived')}
          />
        </label>
        <p>Shiping</p>
        <label>
          Ship
          <input
            type="radio"
            name="shiping"
            value="ship"
            onChange={updateField('shiping')}
          />
        </label>
        <label>
          Pick-UP
          <input
            checked
            type="radio"
            name="shiping"
            value="pick-up"
            onChange={updateField('shiping')}
          />
        </label>
        <label>
          Deliver
          <input
            type="radio"
            name="shiping"
            value="deliver"
            onChange={updateField('shiping')}
          />
        </label>
      </fieldset>
      <input type="submit" value="Create New Work Order" />
    </form>
  );
};

export default CreateJob;
