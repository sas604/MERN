import { useEffect, useReducer, useState } from 'react';
import { Route, Router, Switch, useParams, useRouteMatch } from 'react-router';
import useFetch from '../hooks/useFetch';
import CustomerInfo from './CustomerInfo';
import set from 'lodash/set';
import initialState from '../utils/customerReducer';
import { Link } from 'react-router-dom';
import CreateJob from './CreateJob';
import WorkOrderList from './WorkOrdersList';
import Portal from './Portal';

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateValue':
      return { ...set(state, action.field, action.value) };
    case 'load':
      return {
        ...action.data,
      };
    default:
      return initialState;
  }
};

// customer component
const Customer = () => {
  const { path, url } = useRouteMatch();
  const [edit, setEdit] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const { name } = useParams();
  const options = {
    credentials: 'include',
  };

  // get user from the server
  const urlGet = `http://localhost:5000/api/get/${name}`;
  const [pendingFetch, error, data] = useFetch(urlGet, options, edit);

  // post  data to server
  const postUri = 'http://localhost:5000/api/updatesinglecx';
  const [postOptions, setPostOptions] = useState(false);
  const [pendingPost, postError, postData] = useFetch(
    postUri,
    postOptions,
    postOptions.body
  );
  // reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateField = (field) => (e) => {
    dispatch({ type: 'updateValue', field, value: e.target.value });
  };
  // set data to reducer when it loads
  useEffect(() => {
    if (!data) return;
    dispatch({ type: 'load', data: data.cx });
  }, [data]);

  if (pendingFetch || !data) return <h1>Loading...</h1>;
  if (error) return <h1>Oh snap errror</h1>;

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <CustomerInfo
            readOnly
            values={state} // should be cx object
            updateValue={updateField}
          >
            <Portal id="modal">
              <h1>Shinny New portal</h1>
            </Portal>
            <Link to={`${url}/edit`}>Edit</Link>
          </CustomerInfo>
          <WorkOrderList orders={data.workOrders} />
        </Route>
        <Route path={`${path}/edit`}>
          <CustomerInfo values={state} updateValue={updateField}>
            <button
              type="button"
              onClick={() =>
                setPostOptions({
                  credentials: 'include',
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(state),
                })
              }
            >
              Update
            </button>
          </CustomerInfo>
        </Route>
        <Route path={`${path}/add`}>
          <CreateJob customer={state} />
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
