import { useState } from 'react';
import AddService from './AddService';
import Service from './Service';

const OrderInfo = ({ state, updateField, dispatch }) => {
  const [servicesModal, setServicesModal] = useState(false);
  return (
    <>
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
              serviceTag={service.serviceTag}
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
            value={state.dateRecived}
            onChange={updateField('dateRecived')}
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
          Shipped
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
            type="radio"
            name="recived"
            value="dropoff"
            onChange={updateField('recived')}
          />
        </label>
        <p>Shipping</p>
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
    </>
  );
};
export default OrderInfo;
