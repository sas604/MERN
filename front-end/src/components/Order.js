import styled from 'styled-components';
import { MdExpandMore, MdExpandLess, MdCheck } from 'react-icons/md';
import { useContext, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ToastContext } from './Toast';
import Portal from './Portal';
import ModalContentStyle from '../css/ModalStyles';

const OrderStyles = styled.div`
  margin: 1rem 0;
  background-color: white;
  box-shadow: 0px 10px 13px -7px #0000002e;
  padding: 0.5rem;
  flex-wrap: wrap;
  /* animation: in 0.2s cubic-bezier(0.39, 0.575, 0.565, 1); */

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
    align-self: center;
    justify-content: center;
    display: flex;
    min-height: 30px;
    max-height: 70px;
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
    li {
      font-size: 1.3rem;
      margin: 0;
    }
    li + li {
      margin-left: 0.5rem;
    }
    span {
      text-align: center;
      display: block;
    }
    label {
      display: flex;
      align-items: center;
    }
    .checkBox {
      padding: 0;
      background-color: transparent;
      border: 1px solid var(--black);
      color: white;
    }
    .checkBox.checked {
      background-color: var(--black);
    }
  }
  && button {
    cursor: pointer;
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
    padding: 0;
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
    background-color: transparent;
  }
  .details-info,
  .service-info__item {
    display: flex;
    margin-top: 1rem;
    p:not(:first-child) {
      margin-left: 1rem;
    }
    p {
      flex: 75%;
    }
    p:first-of-type {
      flex: 10%;
    }
  }
  .name-link {
    background-color: transparent;
    font-weight: normal;
    color: var(--blue);
    padding: 0;
    margin: 0;
  }
  @media (max-width: 650px) {
    .work-order-min {
      flex-wrap: wrap;
    }
    .order-list {
      order: 3;
      flex: 50%;
      align-self: center;
    }
    .details-info {
      flex-wrap: wrap;
    }
    && .details-info p {
      flex: 1;
      margin: 0.5rem;
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
  const { setMessage } = useContext(ToastContext);
  const [tracking, setTracking] = useState('');
  const [formError, setFormError] = useState('');
  const [modal, setModal] = useState(false);
  const [more, setMore] = useState(false);
  const updateStatus = (id) => async (e) => {
    const postUrl = `${process.env.REACT_APP_DOMAIN}/api/updateWorkOrder`;
    const options = {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: id,
        status: e?.target.value || 'shipped',
      }),
    };
    try {
      const res = await fetch(postUrl, options);
      const message = await res.json();
      if (!res.ok) {
        throw Error(message);
      } else {
        console.log(message);
        setMessage(['success', message]);
      }
    } catch (e) {
      setMessage(['error', e.message]);
    }
  };

  const updateWithEmail = async () => {
    if (!tracking && !formError) {
      console.log('debil');

      setFormError(
        'No tracking number provided. A confirmation email will not be sent. Click confirm again to continue.'
      );
    } else {
      setFormError('');
      const postUrl = `${process.env.REACT_APP_DOMAIN}/api/shippingWithEmail`;
      const options = {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _id: modal,
          status: 'shipped',
          tracking,
        }),
      };
      try {
        const res = await fetch(postUrl, options);
        const message = await res.json();
        if (!res.ok) {
          throw Error(message);
        } else {
          console.log(message);
          setMessage(['success', message]);
        }
      } catch (e) {
        setMessage(['error', e.message]);
      } finally {
        setTracking('');
        setModal(false);
      }
    }
  };
  return (
    <>
      {modal && (
        <Portal id="modal">
          <ModalContentStyle>
            <p className="promt">Shipping Confirmation</p>
            <p style={{ color: 'red' }}> {formError}</p>
            <label>
              <span>Enter the tracking number</span>
              <input
                type="text"
                placeholder="tracking number"
                value={tracking}
                onChange={(e) => setTracking(e.target.value)}
              />
            </label>
            <button type="button" className="button" onClick={updateWithEmail}>
              Confirm
            </button>
            <button
              type="button"
              onClick={() => {
                document.body.classList.remove('modal-open');
                setModal(false);
              }}
              className="button button--red"
            >
              Cancel
            </button>
          </ModalContentStyle>
        </Portal>
      )}
      <OrderStyles>
        <div className="work-order-min">
          <button
            className="expand"
            onClick={() => setMore(!more)}
            type="button"
          >
            {more ? <MdExpandLess /> : <MdExpandMore />}
          </button>
          <div className="color">
            {order.color?.map((c, i) => (
              <ClorSpan key={`${i}-${c}`} color={c}></ClorSpan>
            ))}
          </div>
          <p className="invoice">#{order.invoice}</p>

          <p>
            {order.make} {order.model} {order.year}
          </p>
          <ul className="order-list">
            {order.status === 'readyToShip' ? (
              <li>
                <button
                  className="button"
                  onClick={() => setModal(order._id)}
                  type="button"
                >
                  Marks as shipped
                </button>
              </li>
            ) : (
              order.services.map((ser) => (
                <li key={ser._id}>
                  <span className="capital">
                    <button
                      className={`checkBox  button ${
                        ser.done ? 'checked' : ''
                      } `}
                      onClick={() => startUpdate(ser._id, order._id)}
                    >
                      <MdCheck />
                    </button>
                    {ser.serviceTag}
                  </span>
                </li>
              ))
            )}
          </ul>
          {order.status === 'shipped' ? (
            <span className="button button--red">Shipped</span>
          ) : (
            <label htmlFor="status">
              Status
              <select
                name="status"
                onChange={updateStatus(order._id)}
                value={order.status}
              >
                <option value="InProgress">In progress </option>
                <option value="waitingOnParts">Waiting on parts </option>
                <option value="readyToBuild">Ready to build </option>
                <option value="built">Built</option>
                <option value="readyToShip">Ready to ship</option>
                <option value="waitingForPayment">Waiting for payment</option>
              </select>
            </label>
          )}
        </div>
        <div className={`details${more ? '' : ' hide'}`}>
          <h4>Work order details</h4>
          <Link className="edit" to={`/${order._id}/edit`}>
            <FaPencilAlt />
          </Link>
          <div className="details-info">
            {
              <Link
                className="name-link"
                to={`/customer/${order.customer.DisplayName}`}
              >
                {' '}
                <p>
                  <span className="desc">Name</span>
                  {order.customer.DisplayName}
                </p>
              </Link>
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
    </>
  );
};
export default Order;
