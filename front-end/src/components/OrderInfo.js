import styled from 'styled-components';
import AddService from './AddService';
import Service from './Service';

const WorkOrderStyles = styled.div`
  fieldset + fieldset {
    margin-top: 1rem;
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
      width: 100%;
      min-width: 150px;
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
    </WorkOrderStyles>
  );
};
export default OrderInfo;
{
  /*  */
}
