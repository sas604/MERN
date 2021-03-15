import { useState } from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import EmailConfirm from './EmailConfirmDialog';
import Order from './Order';

const WorkStyles = styled.div`
  position: relative;
  ul {
    padding: 0;
  }
`;

const WorkOrderList = ({ orders, setRefetch }) => {
  const { url } = useRouteMatch();
  const [modal, setModal] = useState(false);
  const openConfirmDialogWithIds = (orderId, serviceID) => {
    setModal(true);
    func(orderId, serviceID);
  };
  const func = async (orderId, serviceId) => {
    setModal(true);
    console.log(orderId, serviceId);
    // open modal
    // grab dessision
    // run the wunction with ids and emaill or without
    // await updateOeder(orderId, serviceId);
    // setRefetch((s) => !s);
    // move update into order
  };
  const updateOeder = async (orederId, serviceId, email = false) => {
    try {
      const res = await fetch('http://localhost:5000/api/updateWorkOrder', {
        credentials: 'include',
        method: 'POST',
        orederId,
        serviceId,
        email,
      });
      if (!res.ok) {
        throw new Error('Whoops! Something bad happen');
      }
      setModal(false);
      setRefetch((s) => !s);
    } catch (e) {}
  };
  if (!orders || !orders.length)
    return (
      <WorkStyles>
        <Link className="button" to={`${url}/add`}>
          Add New Work Order
        </Link>
        <h3>No Orders</h3>
      </WorkStyles>
    );
  return (
    <WorkStyles>
      <Link className="button" to={`${url}/add`}>
        Add New Work Order
      </Link>
      {modal && <EmailConfirm setModal={setModal} />}
      <ul>
        {orders.map((order, i) => (
          <Order order={order} key={i} setModal={func} />
        ))}
      </ul>
    </WorkStyles>
  );
};
export default WorkOrderList;
