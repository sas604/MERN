// accept customer object
import { reducer } from '../utils/customerReducer';
import { useContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import { ToastContext } from './Toast';

const CustomerInfo = ({ cx }) => {
  const history = useHistory();
  const { setMessage } = useContext(ToastContext);
  const [values, dispatch] = useReducer(reducer, cx);
  const updateValue = (field) => (e) => {
    dispatch({ type: 'updateValue', field, value: e.target.value });
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_DOMAIN}/api/updatesinglecx`,
        {
          credentials: 'include',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        }
      );
      const message = await res.json();
      if (!res.ok) {
        throw Error(message);
      }
      setMessage(['success', 'succesfuly create a customer']);
      console.log(message);
      history.push(`/customer/${message.name}`);
    } catch (e) {
      setMessage(['error', e.message]);
    }
  };
  return (
    <form onSubmit={formSubmit}>
      <CustomerForm
        values={values}
        dispatch={dispatch}
        updateValue={updateValue}
      />
      <button
        style={{ marginBottom: 16 }}
        type="submit"
        className="button button--blue button--block"
      >
        Update
      </button>
      <button
        className="button button--red button--block"
        type="button"
        onClick={() => history.goBack()}
      >
        Cancel
      </button>
    </form>
  );
};

export default CustomerInfo;
