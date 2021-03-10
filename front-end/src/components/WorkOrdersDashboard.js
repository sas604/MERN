import { Link, NavLink, useParams, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import WorkOrderList from './WorkOrdersList';

import useFetch from '../hooks/useFetch';

const DashboardStyles = styled.div`
  nav {
    display: flex;
    gap: 1rem;
    margin: 1rem;
  }
  p {
    margin: 0;
  }
  nav > a {
    border-radius: 2px;
    background-color: lightgrey;
    padding: 1rem;
    text-decoration: none;
    color: black;
    font-weight: 700;
  }
  .active {
    background-color: red;
    color: white;
  }
`;

const WorkOrdersDashboard = () => {
  //get all working orders from db
  const { status } = useParams();
  const { path, url } = useRouteMatch();
  const urlGet = `http://localhost:5000/api/getWorkOrders`;
  const options = {
    credentials: 'include',
  };
  const [pendingFetch, error, data] = useFetch(urlGet, options);
  // sort whaiting for parts
  // sort in work
  // ready to be shiped
  if (pendingFetch) return <h2>Loading...</h2>;
  if (!data) return <h3>No orders</h3>;
  console.log(status);
  return (
    <DashboardStyles>
      <nav>
        <NavLink exact to={`/dashboard/inProgress`}>
          <p>
            In Progress <span className="count">{data.inProgress?.length}</span>
          </p>
        </NavLink>
        <NavLink to={`/dashboard/waitingForParts`}>
          <p>
            Waiting for parts <span className="count">0</span>
          </p>
        </NavLink>

        <NavLink to={`/dashboard/readyToShip`}>
          <p>
            Ready to be Shiped{' '}
            <span className="count">{data.readyToShip?.length || 0}</span>
          </p>
        </NavLink>
      </nav>
      <WorkOrderList orders={data[status]} />
    </DashboardStyles>
  );
};

export default WorkOrdersDashboard;
