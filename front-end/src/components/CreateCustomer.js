import { useState } from 'react';
import useForm from '../hooks/useForm';

const CreateCustomer = ({ close }) => {
  const { values, updateValue, reset } = useForm({
    name: '',
    email: '',
    phone: '',
  });
  const [status, setStatus] = useState('idle');
  console.log(status);
  const url = 'http://localhost:5000/api/createcustomer';
  const options = {
    credentials: 'include',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cx: { values } }),
  };

  const createCx = async (e) => {
    e.preventDefault();
    setStatus({ status: 'loading', msg: 'loading' });
    try {
      const res = await fetch(url, options);
      const msg = await res.json();
      reset();
      setStatus({ status: 'ok', msg });
    } catch (e) {
      console.error(e);
      setStatus({ status: 'error', msg: e.name });
    }
  };
  return (
    <>
      {status !== 'idle' && <h2>{status.msg}</h2>}
      <form onSubmit={createCx}>
        <h2>Create A new customer</h2>
        <label htmlFor="name">
          Name
          <input
            type="text"
            required
            name="name"
            value={values.name}
            onChange={updateValue}
          />
        </label>
        email
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={updateValue}
          />
        </label>
        phone
        <label htmlFor="phone">
          <input
            type="tel"
            name="phone"
            value={values.phone}
            onChange={updateValue}
          />
        </label>
        <input type="submit" />
      </form>
      <button onClick={() => close()}>close</button>
    </>
  );
};

export default CreateCustomer;
