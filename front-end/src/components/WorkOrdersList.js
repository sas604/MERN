import { useContext, useState } from 'react';
import styled from 'styled-components';
import ModalContentStyle from '../css/ModalStyles';
import Order from './Order';
import Portal from './Portal';
import { ToastContext } from './Toast';

const WorkStyles = styled.div`
  position: relative;
  ul {
    padding: 0;
  }
`;

const WorkOrderList = ({ orders }) => {
  const { setMessage } = useContext(ToastContext);
  const [modal, setModal] = useState(false);
  const [updateData, setUpdateData] = useState({});

  const startUpdate = (serviceId, orderId) => {
    document.body.classList.add('modal-open');
    setUpdateData({ service: serviceId, order: orderId });
    setModal(true);
  };
  const update = async (data) => {
    const postUrl = `${process.env.REACT_APP_DOMAIN}/api/updateWorkOrderStatus`;
    const options = {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    try {
      const res = await fetch(postUrl, options);
      const message = await res.json();
      if (!res.ok) {
        throw Error(message);
      } else {
        setModal(false);
        document.body.classList.remove('modal-open');
        setMessage(['success', message]);
      }
    } catch (e) {
      setModal(false);
      document.body.classList.remove('modal-open');
      setMessage(['error', e.message]);
    }
  };

  if (!orders || !orders.length)
    return (
      <WorkStyles>
        <h3>No Orders</h3>
      </WorkStyles>
    );
  return (
    <WorkStyles>
      {modal && (
        <Portal id="modal">
          <ModalContentStyle>
            <p className="promt">Confirm Service Complition</p>
            <button
              type="button"
              className="button"
              onClick={() => {
                update(updateData);
              }}
            >
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
      <ul>
        {orders
          .sort((a, b) => b.invoice - a.invoice)
          .map((order, i) => (
            <Order order={order} key={i} startUpdate={startUpdate} />
          ))}
      </ul>
    </WorkStyles>
  );
};
export default WorkOrderList;
