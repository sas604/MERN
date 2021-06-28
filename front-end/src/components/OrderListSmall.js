import { useContext, useState } from 'react';
import styled from 'styled-components';
import Portal from './Portal';
import { ToastContext } from './Toast';
import ModalContentStyle from '../css/ModalStyles';
import { FaTrash } from 'react-icons/fa';

const OrderStyle = styled.div`
  ul {
    padding: 0;
  }
  li {
    :not(:first-of-type) {
      margin-top: 1rem;
    }
    padding: 0.5rem 1rem;
    background-color: white;
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    align-items: center;
    p {
      span {
        color: var(--gray);
        display: block;
        font-size: 0.8rem;
      }
      text-transform: capitalize;
    }
    div {
      display: flex;
    }
  }
  .del {
    background-color: transparent;
    margin-left: auto;
    border: none;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const OrderListSmall = ({ orders, setRefetch }) => {
  const { setMessage } = useContext(ToastContext);
  const [modal, setModal] = useState(false);
  const [invoice, setInvoice] = useState(false);
  const [confirmed, setConfirmed] = useState('');
  // Open modal and ask if they are shure
  const delOrderConfirm = (invoice) => {
    document.body.classList.add('modal-open');
    setModal(true);
    setInvoice(invoice);
  };
  // if they shure delete
  const delOrder = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_DOMAIN}/api/delete/${invoice}`,
        {
          credentials: 'include',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const message = await res.json();
      if (!res.ok) {
        throw Error(message);
      }
      setMessage(['success', message]);
    } catch (e) {
      setMessage(['error', e.message]);
    } finally {
      setModal(false);
      setConfirmed('');
      setInvoice(false);
      document.body.classList.remove('modal-open');
      setRefetch();
    }
  };
  return (
    <OrderStyle>
      {modal && (
        <Portal id="modal">
          <ModalContentStyle>
            <p className="promt">
              Heads up, you about to delete the work order; this can't be
              undone.
            </p>
            <label>
              <span>
                Type <strong>DELETE</strong> to cotinue.
              </span>
              <input
                type="text"
                placeholder="Type here"
                value={confirmed}
                onChange={(e) => setConfirmed(e.target.value)}
              />
            </label>
            {confirmed === 'DELETE' && (
              <button
                type="button"
                className="button"
                onClick={() => delOrder()}
              >
                Confirm
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                document.body.classList.remove('modal-open');
                setModal(false);
                setInvoice(false);
                setConfirmed('');
              }}
              className="button button--red"
            >
              Cancel
            </button>
          </ModalContentStyle>
        </Portal>
      )}
      <h2>Past Work Orders</h2>
      <ul>
        {orders.map((order, i) => (
          <li key={i}>
            <p>
              <span>Invoice:</span>#{order.invoice}
            </p>
            <div style={{ width: 40, alignSelf: 'stretch' }}>
              {order.color.map((color, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: color,
                    flex: 1,
                    alignSelf: 'stretch',
                  }}
                />
              ))}
            </div>
            <div style={{ gap: 5 }}>
              {order.services.map((ser, i) => (
                <strong>
                  <p key={i}>{ser.serviceTag}</p>
                </strong>
              ))}
            </div>
            <p>
              <span>Status:</span>
              {order.status}
            </p>
            {order.tracking && (
              <p>
                <span>Tracking number:</span>
                <a href={`https://google.com/search?q=${order.tracking}`}>
                  {order.tracking}
                </a>
              </p>
            )}
            <button className="del" onClick={() => delOrderConfirm(order._id)}>
              <FaTrash style={{ color: 'red' }} />
            </button>
          </li>
        ))}
      </ul>
    </OrderStyle>
  );
};
export default OrderListSmall;
