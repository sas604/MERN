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
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Layout sidebar={<Nav />}>
        <div className="App">
          {/**/}

          <Switch>
            <PrivateRoute exact path="/">
              <SearchCustomer />
            </PrivateRoute>
          </Switch>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
          <Switch>
            <PrivateRoute path="/createjob">
              <CreateJob />
            </PrivateRoute>
          </Switch>
          <Switch>
            <PrivateRoute path="/CreateCustomer">
              <CreateCustomer />;
            </PrivateRoute>
          </Switch>
          <Switch>
            <PrivateRoute path="/customer/:name">
              <Customer />
            </PrivateRoute>
          </Switch>
          <Switch>
            <PrivateRoute path="/dashboard/:status">
              <WorkOrdersDashboard />
            </PrivateRoute>
          </Switch>
          <Switch>
            <PrivateRoute path="/:orderId/edit">
              <UpdateOrder />
            </PrivateRoute>
          </Switch>
        </div>
      </Layout>
    </Router>
  );
}

export default App;
