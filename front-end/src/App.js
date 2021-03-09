import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import SearchCustomer from './components/SearchCustomer';
import CreateCustomer from './components/CreateCustomer';
import CreateJob from './components/CreateJob';
import Customer from './components/Customer';

function App() {
  const [name, setName] = useState('');
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/createjob">Create Job</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>
          <h2>Create new job order</h2>

          {/* <button
            onClick={() =>
              fetch('http://localhost:5000/api/login')
                .then((response) => response.json())
                .then((res) => (window.location = res))
            }
          >
            log to quickbooks
          </button>*/}
          <button
            onClick={() =>
              fetch('http://localhost:5000/api/getusers', {
                credentials: 'include',
              })
                .then((response) => response.json())
                .then((res) => console.log(res))
            }
          >
            users
          </button>

          <Switch>
            <Route exact path="/">
              <SearchCustomer setName={setName} />
              <div style={{ border: '1px solid white', margin: '3rem' }}>
                <h3>Or Create a new Customer </h3>
                <button>Create new customer </button>
              </div>
            </Route>
          </Switch>
          <Switch>
            <Route path="/createjob">
              <CreateJob />
            </Route>
          </Switch>
          <Switch>
            <Route path="/CreateCustomer">
              <CreateCustomer />;
            </Route>
          </Switch>
          <Switch>
            <Route path="/customer/:name">
              <Customer />
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
