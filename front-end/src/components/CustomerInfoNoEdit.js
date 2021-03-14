import styled from 'styled-components';
import { FaPencilAlt } from 'react-icons/fa';
import { useState } from 'react';
import Portal from './Portal';
import CustomerInfo from './CustomerInfo';
import { Link, useRouteMatch } from 'react-router-dom';
const CustomerNoEditStyle = styled.div`
  position: relative;
  .edit {
    position: absolute;
    color: var(--red);
    right: 0;
    top: 1.3rem;
    font-size: 1.3rem;
  }
  div {
    display: flex;
    flex-wrap: wrap;
  }
  h2 {
    flex: 100%;
  }
  p {
    flex: 0 50%;
    background-color: white;
    padding: 0.5rem 1rem;
    margin: 0;
  }
  p + p {
    margin-top: 1rem;
  }
  .cx-info {
    p:first-of-type {
      flex: 100%;
    }
    p:nth-of-type(2),
    p:nth-of-type(3),
    p:nth-of-type(4) {
      flex: 25%;
    }
  }
  .address {
    p:nth-of-type(2) {
      margin: 0;
    }
  }
`;

const CustomerInfoNoEdit = ({ cx }) => {
  const { url } = useRouteMatch();
  return (
    <CustomerNoEditStyle>
      <Link className="edit" to={`${url}/edit`}>
        <FaPencilAlt />
      </Link>
      <div className="cx-info">
        <h2>Customer Info</h2>
        <p>
          <span className="desc">Display Name</span>
          {cx.DisplayName}
        </p>
        <p>
          <span className="desc">Contact First Name</span>
          {cx.GivenName}
        </p>
        <p>
          <span className="desc">Contact Last Name</span>
          {cx.FamilyName}
        </p>
        <p>
          <span className="desc">Company Name </span>
          {cx.CompanyName}
        </p>
        <p>
          <span className="desc">Phone </span>
          {cx.PrimaryPhone?.FreeFormNumber}
        </p>
        <p>
          <span className="desc">Email </span>
          {cx.PrimaryEmailAddr?.Address}
        </p>
      </div>
      <div className="address">
        <h2>Billing Address</h2>
        <p>
          <span className="desc">Address Line 1</span>
          {cx.BillAddr?.Line1}
        </p>
        <p>
          <span className="desc">Apt/Ste</span>
          {cx.BillAddr?.Line2}
        </p>
        <p>
          <span className="desc">City</span>
          {cx.BillAddr?.City}
        </p>
        <p>
          <span className="desc">State</span>
          {cx.BillAddr?.CountrySubDivisionCode}
        </p>
        <p>
          <span className="desc">ZIP</span>
          {cx.BillAddr?.PostalCode}
        </p>
      </div>
      <div className="address">
        <h2>Shipping Address</h2>
        <p>
          <span className="desc">Address Line 1</span>
          {cx.ShipAddr?.Line1}
        </p>
        <p>
          <span className="desc">Apt/Ste</span>
          {cx.ShipAddr?.Line2}
        </p>
        <p>
          <span className="desc">City</span>
          {cx.ShipAddr?.City}
        </p>
        <p>
          <span className="desc">State</span>
          {cx.ShipAddr?.CountrySubDivisionCode}
        </p>
        <p>
          <span className="desc">ZIP</span>
          {cx.ShipAddr?.PostalCode}
        </p>
      </div>
    </CustomerNoEditStyle>
  );
};
export default CustomerInfoNoEdit;
