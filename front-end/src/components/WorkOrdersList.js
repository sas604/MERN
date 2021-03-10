import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Order from './Order';

const WorkStyles = styled.div`
  ul {
    padding: 0;
  }
`;

const WorkOrderList = ({ orders }) => {
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
      <ul>
        {orders.map((order, i) => (
          <Order order={order} key={i} />
        ))}
      </ul>
      <Link to={`${url}/add`}>Add</Link>
    </WorkStyles>
  );
};
export default WorkOrderList;
