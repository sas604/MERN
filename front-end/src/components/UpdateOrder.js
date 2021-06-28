import { useContext, useEffect, useReducer } from 'react';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import OrderInfo from './OrderInfo';
import { reducer, initialState } from '../utils/jobReducer';
import { ToastContext } from './Toast';

const UpdateOrder = () => {
  const { setMessage } = useContext(ToastContext);
  const { orderId } = useParams();
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);
  // get the  order

  const urlGet = `${process.env.REACT_APP_DOMAIN}/api/getWorkOrder/${orderId}`;
  const updateField = (field) => (e) => {
    dispatch({ type: 'updateValue', field, value: e.target.value });
  };
  const [pendingFetch, error, data] = useFetch(urlGet, {
    credentials: 'include',
  });
  if (error) setMessage(['error', error]);
  useEffect(() => dispatch({ type: 'setOrder', data }), [data]);

  const updateWorkOrder = async () => {
    const postUrl = `${process.env.REACT_APP_DOMAIN}/api/updateWorkOrder`;
    const options = {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    };
    try {
      const res = await fetch(postUrl, options);
      const message = await res.json();
      if (!res.ok) {
        throw Error(message);
      } else {
        setMessage(['success', message]);
        history.goBack();
      }
    } catch (e) {
      setMessage(['error', e.message]);
    }
  };
  if (pendingFetch || !data?._id) return <h1>Loading...</h1>;
  return (
    <div className="max-width">
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
    </div>
  );
};

export default UpdateOrder;
