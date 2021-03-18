// accept customer object
import { reducer } from '../utils/customerReducer';
import { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import CustomerForm from './CustomerForm';

const CustomerInfo = ({ cx }) => {
  const history = useHistory();
  const [values, dispatch] = useReducer(reducer, cx);
  const updateValue = (field) => (e) => {
    dispatch({ type: 'updateValue', field, value: e.target.value });
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/updatesinglecx', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        throw Error('Something bad happened');
      }
      history.go(-1);
    } catch (e) {
      console.log(e);
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
