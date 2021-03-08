import React, { useReducer, useState } from 'react';
import useForm from '../hooks/useForm';
import AddService from './AddService';
import CustomerInfo from './CustomerInfo';
import Service from './Service';

const initialState = {
  customer: {},
  make: '',
  model: '',
  year: '',
  services: [
    { name: 'MP', parts: 'shaft' },
    { name: 'TR', parts: 'All' },
    { name: 'VB', parts: 'Gears, shaft' },
  ],
  invoice: '',
};

const reducer = (state, action) => {
  switch (action.type) {
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
const CreateJob = () => {
  const [servicesModal, setServicesModal] = useState(false);
  const workOreder = {
    year: '',
    make: '',
    model: '',
    totalParts: '',
    color: '#000000',
    date: '',
    recived: '',
    shiping: '',
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [values, updateValue] = useForm(workOreder);
  //collect inforamation about the job
  // send it to the server
  return (
    <form>
      <CustomerInfo />
      <div className="work-order">
        <h2>Work Oder Info</h2>
        <fieldset>
          <label htmlFor="year">
            YEAR
            <input
              type="number"
              name="year"
              value={values.year}
              max="2200"
              onChange={updateValue}
            />
          </label>
          <label htmlFor="make">
            MAKE
            <input
              type="text"
              name="make"
              value={values.make}
              onChange={updateValue}
            />
          </label>
          <label htmlFor="model">
            MODEL
            <input
              type="text"
              name="model"
              value={values.model}
              onChange={updateValue}
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

      <fieldset className="officeuse">
        <label>
          Total Parts
          <input
            type="number"
            name="totalParts"
            value={values.totalParts}
            onChange={updateValue}
          />
        </label>
        <label>
          Date Recived
          <input
            type="date"
            name="date"
            value={values.date}
            onChange={updateValue}
          />
        </label>
        <label>
          Color Tag
          <input
            type="color"
            name="color"
            value={values.color}
            onChange={updateValue}
          />
        </label>
        <p>Recived By</p>
        <label>
          Shiped
          <input
            type="radio"
            name="recived"
            value="shiped"
            onChange={updateValue}
          />
        </label>
        <label>
          Drop off
          <input
            type="radio"
            name="recived"
            value="dropoff"
            onChange={updateValue}
          />
        </label>
        <p>Shiping</p>
        <label>
          Ship
          <input
            type="radio"
            name="shiping"
            value="ship"
            onChange={updateValue}
          />
        </label>
        <label>
          Pick-UP
          <input
            type="radio"
            name="shiping"
            value="pick-up"
            onChange={updateValue}
          />
        </label>
        <label>
          Deliver
          <input
            type="radio"
            name="shiping"
            value="deliver"
            onChange={updateValue}
          />
        </label>
      </fieldset>
      <input type="submit" value="Create New Work Order" />
    </form>
  );
};

export default CreateJob;
