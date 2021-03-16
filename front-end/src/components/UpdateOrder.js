import { useEffect, useReducer } from 'react';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import OrderInfo from './OrderInfo';
import { reducer, initialState } from '../utils/jobReducer';

const UpdateOrder = () => {
  const { orderId } = useParams();
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);
  // get the  order

  const urlGet = `http://localhost:5000/api/getWorkOrder/${orderId}`;
  const updateField = (field) => (e) => {
    dispatch({ type: 'updateValue', field, value: e.target.value });
  };
  const [pendingFetch, error, data] = useFetch(urlGet, {
    credentials: 'include',
  });
  useEffect(() => dispatch({ type: 'setOrder', data }), [data]);

  const updateWorkOrder = async () => {
    const postUrl = `http://localhost:5000/api/updateWorkOrder`;
    const options = {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    };
    try {
      const res = await fetch(postUrl, options);
      if (!res.ok) {
        throw Error('Cant Update Order');
      } else {
        history.goBack();
      }
    } catch (e) {
      console.log(e);
    }
  };
  if (pendingFetch || !data?._id) return <h1>Loading...</h1>;
  return (
    <>
      <h1>Updtae Work Order- #{state.invoice}</h1>
      <OrderInfo dispatch={dispatch} state={state} updateField={updateField} />
      <button
        type="button"
        onClick={() => history.goBack()}
        className="button button--red button--fullwidth"
      >
        CANCEL
      </button>
      <button
        type="button"
        onClick={updateWorkOrder}
        className="button button--fullwidth"
        style={{ marginTop: 16 }}
      >
        UPDATE
      </button>
    </>
  );
};

export default UpdateOrder;
