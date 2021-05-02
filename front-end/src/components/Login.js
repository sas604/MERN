import { useContext } from 'react';
import { Redirect, useHistory } from 'react-router';
import { AuthContext } from './Auth';

const Login = () => {
  const { user } = useContext(AuthContext);

  if (user) return <Redirect to="/" />;

  return (
    <div style={{ padding: '6rem' }}>
      {' '}
      <button
        className="button"
        style={{ margin: '0 auto', display: 'block', maxWidth: '250px' }}
        onClick={() =>
          fetch(`${process.env.REACT_APP_DOMAIN}/api/login`)
            .then((response) => response.json())
            .then((res) => (window.location = res))
        }
      >
        Login with quickbooks
      </button>
    </div>
  );
};

export default Login;
