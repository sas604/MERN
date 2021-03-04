import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const cookie = document.cookie;
  console.log(cookie);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          onClick={() =>
            fetch('http://localhost:5000/api/login')
              .then((response) => response.json())
              .then((res) => (window.location = res))
          }
        >
          log to quickbooks
        </button>

        <button
          onClick={() =>
            fetch('http://localhost:5000/api/getusers', {
              credentials: 'include',
            }).then((res) => console.log(res))
          }
        >
          get Customers
        </button>
      </header>
    </div>
  );
}

export default App;
