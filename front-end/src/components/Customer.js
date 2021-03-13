import { useEffect, useReducer, useState } from 'react';
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
import Portal from './Portal';
import CustomerInfoNoEdit from './CustomerInfoNoEdit';

// customer component
const Customer = () => {
  const { path } = useRouteMatch();
  const [addNew, setAddNew] = useState(false);
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
    <>
      <Switch>
        <Route exact path={path}>
          <CustomerInfoNoEdit cx={data.cx} />

          <WorkOrderList orders={data.workOrders} />
        </Route>
        <Route path={`${path}/edit`}>
          <CustomerInfo cx={data.cx} />
        </Route>
        <Route path={`${path}/add`}>
          <CreateJob customer={data.cx} />
        </Route>
      </Switch>
    </>
  );

  // return (
  //   <LI>
  //     <button type="button" onClick={() => setEdit(true)}>
  //       Edit
  //     </button>
  //     <CustomerInfo */}
  //       readOnly={!edit}
  //       values={state} // should be cx object
  //       updateValue={updateField}
  //     />
  //     {edit && (
  //       <>
  //
  //         <button type="button" onClick={() => setEdit(false)}>
  //           Cancel
  //         </button>
  //         <button type="button">Create new job</button>
  //       </>
  //     )}
  //   </LI>
  // );
};

export default Customer;

// modal example
/* <Portal id="modal">
              <h1>Shinny New portal</h1>
            </Portal> */
