import { Link } from 'react-router-dom';
const Nav = () => (
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
      <li>
        <Link to="/dashboard/inProgress">Work orders</Link>
      </li>
      <li>
        <Link to="/createCustomer">Create Customer</Link>
      </li>
      <li>
        <Link to="/test">Create Customer</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
