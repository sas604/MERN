import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavStyles = styled.nav`
  li {
    list-style: none;
    a {
      color: white;
      font-weight: 600;
      font-size: 1.3rem;
      text-decoration: none;
    }
  }
  li + li {
    margin-top: 1rem;
  }
`;
const Nav = () => (
  <NavStyles>
    <ul>
      <li>
        <Link to="/dashboard/inProgress">Work orders</Link>
      </li>
      <li>
        <Link to="/">Search Customer</Link>
      </li>
      <li>
        <Link to="/createCustomer">Create Customer</Link>
      </li>
    </ul>
  </NavStyles>
);

export default Nav;
