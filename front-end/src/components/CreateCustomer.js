import { useState } from 'react';
import useForm from '../hooks/useForm';
// TODO make all nessesary fields
const CreateCustomer = ({ close }) => {
  const { values, updateValue, reset } = useForm({
    name: '',
    email: '',
    phone: '',
  });
  const [status, setStatus] = useState('idle');
  const url = 'http://localhost:5000/api/createcustomer';
  // options for the fetch
  const options = {
    credentials: 'include',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cx: {
        DisplayName: values.name,
        PrimaryEmailAddr: {
          Address: values.email,
        },
        PrimaryPhone: {
          FreeFormNumber: values.phone,
        },
      },
    }),
  };
  // handle form submit
  const createCx = async (e) => {
    e.preventDefault();
    setStatus({ status: 'loading', msg: 'loading' });
    try {
      const res = await fetch(url, options);
      const msg = await res.json();
      if (!res.ok) {
        throw new Error(
          'Something went wrong while creating new customer. Make sure that cx name is unique'
        );
      }

      reset();
      setStatus({ status: 'success', msg });
    } catch (e) {
      setStatus({ status: 'error', msg: e.message });
    }
  };
  return (
    <>
      {status !== 'idle' && <h6>{status.msg}</h6>}
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
