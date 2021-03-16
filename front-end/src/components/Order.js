import styled from 'styled-components';
import { MdPhotoCamera, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { useReducer, useState } from 'react';
import OrderInfo from './OrderInfo';
import { reducer, initialState } from '../utils/jobReducer';

const OrderStyles = styled.div`
  margin: 1rem 0;
  background-color: white;
  box-shadow: 0px 10px 13px -7px #0000002e;
  padding: 0.5rem;
  li {
    list-style: none;
  }
  li + li {
    margin-top: 1rem;
  }
  .work-order-min {
    position: relative;
    z-index: 5;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    & > * {
      flex: 2;
    }
  }
  .color {
    flex: 1;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    > * {
      flex: 0 1 40px;
    }
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
      margin-right: 0.5rem;
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

  .hide {
    display: none;
  }
  .details {
    padding: 1rem;
  }
  .details-info,
  .service-info__item {
    display: flex;
    margin-top: 1rem;
    & :not(:first-child) {
      margin-left: 3rem;
    }
    p {
      flex: 75%;
    }
    p:first-of-type {
      flex: 10%;
    }
  }
`;

const ClorSpan = styled.span`
  flex: 1;
  aspect-ratio: 1/1;
  background-color: ${(props) => props.color};
`;

const Order = ({ order, setModal, onService }) => {
  const updateField = (field) => (e) => {
    dispatch({ type: 'updateValue', field, value: e.target.value });
  };
  const [state, dispatch] = useReducer(reducer, order);
  const [more, setMore] = useState(false);
  return (
    <OrderStyles>
      <div className="work-order-min">
        <button className="expand" onClick={() => setMore(!more)} type="button">
          {more ? <MdExpandLess /> : <MdExpandMore />}
        </button>
        <div className="color">
          {order.color?.map((c, i) => (
            <ClorSpan key={`${i}-${c}`} color={c}></ClorSpan>
          ))}
        </div>
        <p className="invoice">#4567783</p>
        {<p> {order.customer.DisplayName} </p>}
        <p>
          {order.make} {order.model} {order.year}
        </p>
        <ul className="order-list">
          {order?.services.map((ser) => (
            <li key={ser._id} className={`${ser.done ? '' : 'notdone'}`}>
              <label className="capital">
                <input type="checkbox" checked={ser.done} readOnly />
                {ser.serviceTag}
              </label>
            </li>
          ))}
        </ul>
        <h3>Status: {order.status} </h3>
      </div>
      <div className={`details${more ? '' : ' hide'}`}>
        <h4>Work order details</h4>
        <div className="details-info">
          <p>
            <span className="desc">Year</span>
            {order.year}
          </p>
          <p>
            <span className="desc">Make</span>
            {order.make}
          </p>
          <p>
            <span className="desc">Model</span>
            {order.model}
          </p>
          <p>
            <span className="desc">Date Recived</span>
            {order.dateRecived}
          </p>
          <p>
            <span className="desc">Recived by</span>
            {order.recived}
          </p>
          <p>
            <span className="desc">Shipping</span>
            {order.shiping}
          </p>
        </div>
        <div className="service-info">
          {order.services.map((ser) => (
            <div className="service-info__item" key={ser._id}>
              <p className="capital">
                <span className="desc">Service Tag</span>
                {ser.serviceTag}
              </p>
              <p>
                <span className="desc">Description</span>
                {ser.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </OrderStyles>
  );
};
export default Order;
