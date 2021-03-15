import styled from 'styled-components';
import AddService from './AddService';
import Service from './Service';

const WorkOrderStyles = styled.div`
  margin-bottom: 1rem;
  fieldset + fieldset {
    margin-top: 1rem;
  }
  input {
    width: 100%;
  }

  .head {
    background-color: var(--black);
    display: flex;
    flex-wrap: wrap;
    border: unset;

    label {
      flex: 1;
      color: var(--white);
      margin: 0.5rem;
    }
    input {
      min-width: 150px;
    }
  }
  .office-use {
    label:first-of-type {
      width: 100px;
    }
    label {
      display: inline-block;
      margin-right: 2rem;
    }
  }
  input[type='color'] {
    width: 3rem;
    height: 3rem;
    padding: 0;
  }
  input[type='radio'] {
    width: unset;
    margin: 0 0.5rem;
  }
  .colors {
    margin: 1rem 0;
    display: flex;
    align-items: center;
    span {
      margin-right: 1rem;
    }
  }
`;

const OrderInfo = ({ state, updateField, dispatch }) => {
  return (
    <WorkOrderStyles>
      <div className="work-order">
        <fieldset className="head">
          <label htmlFor="year">
            YEAR
            <input
              id="year"
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
              id="make"
              type="text"
              name="make"
              value={state.make}
              onChange={updateField('make')}
            />
          </label>
          <label htmlFor="model">
            MODEL
            <input
              id="model"
              type="text"
              name="model"
              value={state.model}
              onChange={updateField('model')}
            />
          </label>
        </fieldset>
        <fieldset className="service" style={{ position: 'relative' }}>
          <AddService dispatch={dispatch} />
          <h3>Services to be performed </h3>
          {state.services.length > 0 ? (
            state.services?.map((service, i) => (
              <Service
                key={i}
                index={i}
                dispatch={dispatch}
                description={service.description}
                serviceTag={service.serviceTag}
              />
            ))
          ) : (
            <p className="warning">No services added</p>
          )}
        </fieldset>
      </div>

      <fieldset className="office-use">
        <h2>Work Order Info</h2>
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
        <div className="colors">
          <span>Color Tags:</span>
          <input
            type="color"
            value={state.color[0]}
            onChange={updateField('color')}
          />
          <input
            type="color"
            value={state.color[1]}
            disabled={state.color.length < 1}
            onChange={updateField('color-1')}
          />
          <input
            type="color"
            value={state.color[2]}
            disabled={state.color.length < 2}
            onChange={updateField('color-2')}
          />
        </div>

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
    </WorkOrderStyles>
  );
};
export default OrderInfo;
