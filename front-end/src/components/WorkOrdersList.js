import { useState } from 'react';
import styled from 'styled-components';
import ModalContentStyle from '../css/ModalStyles';
import Order from './Order';
import Portal from './Portal';

const WorkStyles = styled.div`
  position: relative;
  ul {
    padding: 0;
  }
`;

const WorkOrderList = ({ orders }) => {
  const [modal, setModal] = useState(false);
  const [updateData, setUpdateData] = useState({});

  const startUpdate = (serviceId, orderId) => {
    document.body.classList.add('modal-open');
    setUpdateData({ service: serviceId, order: orderId });
    setModal(true);
  };
  const update = async (data) => {
    const postUrl = `http://localhost:5000/api/updateWorkOrderStatus`;
    const options = {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    try {
      const res = await fetch(postUrl, options);
      if (!res.ok) {
        throw Error('Cant Update Order');
      } else {
        setModal(false);
        document.body.classList.remove('modal-open');
        console.log('success');
      }
    } catch (e) {
      console.log(e);
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
        {orders.map((order, i) => (
          <Order order={order} key={i} startUpdate={startUpdate} />
        ))}
      </ul>
    </WorkStyles>
  );
};
export default WorkOrderList;
