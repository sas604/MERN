import styled from 'styled-components';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const OrderStyles = styled.div`
  margin: 1rem 0;
  background-color: white;
  box-shadow: 0px 10px 13px -7px #0000002e;
  padding: 0.5rem;
  flex-wrap: wrap;
  animation: in 0.2s cubic-bezier(0.39, 0.575, 0.565, 1);

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
    flex: 0 0 3rem;
    align-self: stretch;
    justify-content: center;
    display: flex;
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
    padding: 0;
    flex: 0 10px;
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
    position: relative;
  }

  .edit {
    position: absolute;
    color: var(--red);
    left: 11rem;
    top: 2rem;
    font-size: 1.3rem;
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
  @keyframes in {
    from {
      transform: translateY(-100px);
    }
    to {
      transform: translateY(0);
    }
  }
`;
const ClorSpan = styled.span`
  flex: 1;
  background-color: ${(props) => props.color};
`;

const Order = ({ order, startUpdate }) => {
  const updateStatus = (id) => async (e) => {
    const postUrl = `http://localhost:5000/api/updateWorkOrder`;
    const options = {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: id,
        status: e.target.value,
      }),
    };
    try {
      const res = await fetch(postUrl, options);
      if (!res.ok) {
        throw Error('Cant Update Order');
      } else {
        console.log('success');
      }
    } catch (e) {
      console.log(e);
    }
  };
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

        <p>
          {order.make} {order.model} {order.year}
        </p>
        <ul className="order-list">
          {order?.services.map((ser) => (
            <li key={ser._id} className={`${ser.done ? '' : 'notdone'}`}>
              <label className="capital">
                <input
                  type="checkbox"
                  onChange={() => startUpdate(ser._id, order._id)}
                  checked={ser.done}
                  readOnly
                />
                {ser.serviceTag}
              </label>
            </li>
          ))}
        </ul>
        <label htmlFor="status">
          Status
          <select
            name="status"
            onChange={updateStatus(order._id)}
            value={order.status}
          >
            <option value="inProgress">In progress </option>
            <option value="waitingOnParts">Waiting on parts </option>
            <option value="readyToBuild">Ready to build </option>
            <option value="readyToShip">Ready to ship</option>
            <option value="waitingForPayment">Waiting for payment</option>
          </select>
        </label>
      </div>
      <div className={`details${more ? '' : ' hide'}`}>
        <h4>Work order details</h4>
        <Link className="edit" to={`/${order._id}/edit`}>
          <FaPencilAlt />
        </Link>
        <div className="details-info">
          {
            <p>
              <span className="desc">Name</span>
              {order.customer.DisplayName}
            </p>
          }
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
