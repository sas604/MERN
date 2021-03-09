import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import Order from './Order';

const WorkOrderList = ({ orders }) => {
  const { url } = useRouteMatch();
  if (!orders.length)
    return (
      <>
        <h3>No Orders</h3>
        <Link to={`${url}/add`}>Add Work Order</Link>
      </>
    );
  return (
    <div>
      <ul>
        {orders.map((order, i) => (
          <Order order={order} key={i} />
        ))}
      </ul>
      <Link to={`${url}/add`}>Add</Link>
    </div>
  );
};
export default WorkOrderList;
