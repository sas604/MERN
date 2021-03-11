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

const WorkOrderList = ({ orders, modal, setModal }) => {
  const { url } = useRouteMatch();

  if (!orders || !orders.length)
    return (
      <WorkStyles>
        <h3>No Orders</h3>
        <Link to={`${url}/add`}>Add Work Order</Link>
      </WorkStyles>
    );
  return (
    <WorkStyles>
      {modal && <EmailConfirm setModal={setModal} />}
      <ul>
        {orders.map((order, i) => (
          <Order order={order} key={i} setModal={setModal} />
        ))}
      </ul>
      <Link to={`${url}/add`}>Add</Link>
    </WorkStyles>
  );
};
export default WorkOrderList;
