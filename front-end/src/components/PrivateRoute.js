import { useContext } from 'react';
import { Route, Redirect } from 'react-router';
import { AuthContext } from './Auth';

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
