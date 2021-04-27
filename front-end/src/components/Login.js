import { useContext } from 'react';
import { Redirect, useHistory } from 'react-router';
import { AuthContext } from './Auth';

const Login = () => {
  const { user } = useContext(AuthContext);

  if (user) return <Redirect to="/" />;

  return (
    <>
      {' '}
      <button
        onClick={() =>
          fetch(`${process.env.REACT_APP_DOMAIN}/api/login`)
            .then((response) => response.json())
            .then((res) => (window.location = res))
        }
      >
        log to quickbooks
      </button>
      <button
        onClick={() =>
          fetch(`${process.env.REACT_APP_DOMAIN}/api/getusers`, {
            credentials: 'include',
          })
            .then((response) => response.json())
            .then((res) => console.log(res))
        }
      >
        users
      </button>{' '}
    </>
  );
};

export default Login;
