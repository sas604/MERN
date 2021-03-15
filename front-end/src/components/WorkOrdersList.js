import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Order from './Order';

const WorkStyles = styled.div`
  position: relative;
  ul {
    padding: 0;
  }
`;

const WorkOrderList = ({ orders }) => {
  if (!orders || !orders.length)
    return (
      <WorkStyles>
        <h3>No Orders</h3>
      </WorkStyles>
    );
  return (
    <WorkStyles>
      <ul>
        {orders.map((order, i) => (
          <Order order={order} key={i} />
        ))}
      </ul>
    </WorkStyles>
  );
};
export default WorkOrderList;
