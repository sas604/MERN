import {
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router';
import useFetch from '../hooks/useFetch';
import CustomerInfo from './CustomerInfo';

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
  const urlGet = `http://localhost:5000/api/get/${name}`;
  const [pendingFetch, error, data] = useFetch(urlGet, options, location.key);

  // post  data to server

  // reducer

  // set data to reducer when it loads

  if (pendingFetch || !data) return <h1>Loading...</h1>;
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
