import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import SearchCustomer from './components/SearchCustomer';
import CreateCustomer from './components/CreateCustomer';
import CreateJob from './components/CreateJob';
import Customer from './components/Customer';
import WorkOrdersDashboard from './components/WorkOrdersDashboard';
import Layout from './components/Layout';
import Nav from './components/Nav';
import UpdateOrder from './components/UpdateOrder';

function App() {
  return (
    <Router>
      <Layout sidebar={<Nav />}>
        <div className="App">
          {/* <button
            onClick={() =>
              fetch('http://localhost:5000/api/login')
                .then((response) => response.json())
                .then((res) => (window.location = res))
            }
          >
            log to quickbooks
          </button>*/}
          {/* <button
            onClick={() =>
              fetch('http://localhost:5000/api/getusers', {
                credentials: 'include',
              })
                .then((response) => response.json())
                .then((res) => console.log(res))
            }
          >
            users
          </button> */}

          <Switch>
            <Route exact path="/">
              <SearchCustomer />
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
          <Switch>
            <Route path="/dashboard/:status">
              <WorkOrdersDashboard />
            </Route>
          </Switch>
          <Switch>
            <Route path="/:orderId/edit">
              <UpdateOrder />
            </Route>
          </Switch>
        </div>
      </Layout>
    </Router>
  );
}

export default App;
