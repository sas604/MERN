import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GlobalStyle from './css/Global';
import 'normalize.css';
import { AuthProvider } from './components/Auth';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalStyle />
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
