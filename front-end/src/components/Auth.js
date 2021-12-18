import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  //const [currentUser, setCurrentUser] = useState();
  const url = `${process.env.REACT_APP_DOMAIN}/api/user`;

  const [pendingFetch, error, data] = useFetch(url, {
    credentials: 'include',
  });

  return (
    <AuthContext.Provider
      value={{
        user: data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
