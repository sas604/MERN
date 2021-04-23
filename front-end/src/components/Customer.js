import {
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router';
import useFetch from '../hooks/useFetch';
import CustomerInfo from './CustomerInfo';
import ClipLoader from 'react-spinners/ClipLoader';
import { Link } from 'react-router-dom';
import CreateJob from './CreateJob';
import WorkOrderList from './WorkOrdersList';

import CustomerInfoNoEdit from './CustomerInfoNoEdit';

// customer component
const Customer = () => {
  const { path, url } = useRouteMatch();
  const { name } = useParams();
  const options = {
    credentials: 'include',
  };
  const location = useLocation();

  // get user from the server
  const urlGet = `http://${
    process.env.REACT_APP_DOMAIN || 'localhost:5000'
  }/api/get/${name}`;
  const [pendingFetch, error, data] = useFetch(urlGet, options, location.key);
  if (!data || pendingFetch)
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

  if (error) return <h1>Oh snap errror</h1>;

  return (
    <div className="max-width ">
      <Switch>
        <Route exact path={path}>
          <CustomerInfoNoEdit cx={data.cx} />
          <h2>Work Orders</h2>
          <Link className="button" to={`${url}/add`}>
            Add New Work Order
          </Link>
          <WorkOrderList orders={data.workOrders} />
        </Route>
        <Route path={`${path}/edit`}>
          <CustomerInfo cx={data.cx} />
        </Route>
        <Route path={`${path}/add`}>
          <CreateJob customer={data.cx} />
        </Route>
      </Switch>
    </div>
  );
};

export default Customer;
