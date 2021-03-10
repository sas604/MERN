import styled from 'styled-components';
import { MdPhotoCamera, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { useState } from 'react';
//import { Link } from 'react-router-dom';
const OrderStyles = styled.div`
  border: 1px solid black;
  margin: 1rem 0;
  padding: 1rem;
  transition: all 0.5s;
  li {
    list-style: none;
  }
  li + li {
    margin-top: 1rem;
  }
  .work-order-min {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    & > * {
      flex: 2;
    }
  }
  .color {
    flex: 1;
    align-self: center;
    display: block;
    background-color: ${(props) => props.color || 'red'};
    aspect-ratio: 1;
  }
  .invoice {
    flex: 1;
  }
  .order-list {
    flex: 6;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    & li {
      font-size: 1.3rem;
      margin: 0;
    }
    label {
      display: flex;
      align-items: center;
    }
    input[type='checkbox'] {
      -webkit-appearance: none;
      width: 30px;
      height: 30px;
      background: white;
      border-radius: 5px;
      border: 2px solid #555;
    }
    input[type='checkbox']:checked {
      background: #abd;
    }
  }
  && button {
    cursor: pointer;
    flex: 1;
    display: flex;
    align-self: stretch;
    align-items: center;
    & svg {
      flex: 1;
      font-size: 2rem;
    }
  }
  .expand {
    background-color: transparent;
    -webkit-appearance: none;
    outline: none;
    border: none;
  }
  .details-hide {
    display: none;
  }
`;

const Order = ({ order }) => {
  const updateField = (field) => (f) => f;
  const [more, setMore] = useState(false);
  return (
    <OrderStyles color={order.color}>
      <div className="work-order-min">
        <button className="expand" onClick={() => setMore(!more)} type="button">
          {more ? <MdExpandLess /> : <MdExpandMore />}
        </button>
        <span className="color"></span>
        <p className="invoice">#4567783</p>
        <p> {order.customer.DisplayName} </p>
        <button type="button" className="photos">
          <MdPhotoCamera />
        </button>
        <p>
          {order.make} {order.model} {order.year}
        </p>
        <ul className="order-list">
          {order?.services.map((ser) => (
            <li key={ser._id}>
              <label>
                <input type="checkbox" checked={ser.done} readOnly />
                {ser.serviceTag}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className={`details${more ? '' : '-hide'}`}>
        <h4>Work order details</h4>
        <ul className="service-list">
          {order?.services.map((ser) => (
            <li>
              <fieldset disabled>
                <label>
                  service
                  <input value={ser.name} readOnly />
                </label>
                <label>
                  Parts
                  <input value={ser.parts} readOnly />
                </label>
              </fieldset>
            </li>
          ))}
        </ul>
        <fieldset className="office-use">
          <label>
            Total Parts
            <input
              type="number"
              name="totalParts"
              value={order.totalParts}
              onChange={updateField('totalParts')}
            />
          </label>
          <label>
            Date Recived
            <input
              type="date"
              name="date"
              value={order.date}
              onChange={updateField('date')}
            />
          </label>

          <p>Recived By {order.recived}</p>
          <p>Shiping method: {order.shiping}</p>
          <label>
            Ready for Shiping ?
            <input type="checkbox" checked={order.readyToShip} />
          </label>
        </fieldset>
      </div>
    </OrderStyles>
  );
};
export default Order;
