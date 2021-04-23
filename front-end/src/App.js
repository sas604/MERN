import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
import Toast from './components/Toast';

function App() {
  console.log(process.env.REACT_APP_DOMAIN);
  return (
    <Toast>
      <Router>
        <Layout sidebar={<Nav />}>
          <div className="App">
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
    </Toast>
  );
}

export default App;
