import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import WorkOrderList from './WorkOrdersList';
import ClipLoader from 'react-spinners/ClipLoader';
import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const DashboardStyles = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  nav {
    display: flex;
    flex-wrap: wrap;
    margin: 1rem 0;
  }
  p {
    margin: 0;
  }
  a {
    border-radius: 2px;
    background-color: lightgrey;
    padding: 0.5rem;
    text-decoration: none;
    color: black;
    font-weight: 700;
    margin: 0.2rem 0.5rem;
  }

  .active {
    background-color: red;
    color: white;
  }
`;

const WorkOrdersDashboard = () => {
  const { status } = useParams();

  const urlGet = `${process.env.REACT_APP_DOMAIN}/api/getWorkOrders`;
  const [refetch, setRefetch] = useState(false);
  const options = {
    credentials: 'include',
  };
  const [pendingFetch, error, data] = useFetch(urlGet, options, refetch);
  useEffect(() => {
    const socket = io(
      `${process.env.REACT_APP_DOMAIN || 'https://cryoheatdash.com'}`
    );

    // socket.on('connect', () => {});
    socket.on('Hello', () => setRefetch((s) => !s));
    return () => socket.disconnect();
  }, []);

  if (pendingFetch)
    return (
      <div
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <ClipLoader loading={pendingFetch} />
      </div>
    );
  if (!data) return <h3>No orders</h3>;

  const statuses = data.reduce(
    (a, status) => ({ ...a, [status._id]: [...status.docs] }),
    {}
  );

  return (
    <DashboardStyles>
      <nav>
        <NavLink exact to={`/dashboard/inProgress`}>
          <p>
            In Progress{' '}
            <span className="count">{statuses.inProgress?.length}</span>
          </p>
        </NavLink>
        <NavLink to={`/dashboard/waitingOnParts`}>
          <p>
            Waiting on parts{' '}
            <span className="count">{statuses.waitingOnParts?.length}</span>
          </p>
        </NavLink>

        <NavLink to={`/dashboard/readyToBuild`}>
          <p>
            Ready to build{' '}
            <span className="count">{statuses.readyToBuild?.length}</span>
          </p>
        </NavLink>
        <NavLink to={`/dashboard/built`}>
          <p>
            Built <span className="count">{statuses.built?.length}</span>
          </p>
        </NavLink>

        <NavLink to={`/dashboard/waitingForPayment`}>
          <p>
            Waiting on payment{' '}
            <span className="count">{statuses.waitingForPayment?.length}</span>
          </p>
        </NavLink>
        <NavLink to={`/dashboard/readyToShip`}>
          <p>
            Ready to Ship{' '}
            <span className="count">{statuses.readyToShip?.length}</span>
          </p>
        </NavLink>
      </nav>
      <WorkOrderList orders={statuses[status]} />
    </DashboardStyles>
  );
};

export default WorkOrdersDashboard;
