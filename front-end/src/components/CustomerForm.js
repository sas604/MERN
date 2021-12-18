import { useState } from 'react';
import styled from 'styled-components';
import states from '../utils/states';
const CustomerStyles = styled.div`
  background-color: var(--white);
  display: flex;
  margin-bottom: 1rem;
  label {
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
  }
  label > * + * {
    margin-top: 0.5rem;
  }
  flex-wrap: wrap;
  fieldset {
    flex: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .address {
    label {
      flex: 1;
    }
    & label:first-of-type {
      flex: 60%;
    }
  }
  button {
    flex: 100%;
    margin-top: 1rem;
  }
  .shipping-head {
    display: flex;
    align-items: flex-end;
    span {
      margin: 0 0.2rem 0 1rem;
    }
  }
`;

const CustomerForm = ({ values, updateValue, dispatch }) => {
  const [same, setSame] = useState(false);
  return (
    <CustomerStyles>
      <h2>Custromer Info</h2>
      <fieldset className="general">
        <label htmlFor="displayedName">
          <span>Display Name</span>
          <input
            type="text"
            name="DisplayName"
            value={values.DisplayName || ''}
            onChange={updateValue('DisplayName')}
          ></input>
        </label>

        <label htmlFor="company">
          <span>Business Name</span>
          <input
            type="text"
            name="CompanyName"
            value={values.CompanyName}
            onChange={updateValue('CompanyName')}
          />
        </label>
        <label htmlFor="first-name">
          <span>Contact First Name</span>
          <input
            type="text"
            name="GivenName"
            value={values.GivenName}
            onChange={updateValue('GivenName')}
          />
        </label>
        <label htmlFor="last-name">
          <span>Contact Last Name</span>
          <input
            type="text"
            name="FamilyName"
            value={values.FamilyName}
            onChange={updateValue('FamilyName')}
          />
        </label>
        <label htmlFor="email">
          <span>Email</span>
          <input
            type="email"
            name="PrimaryEmailAddr.Address"
            value={values.PrimaryEmailAddr?.Address || ''}
            onChange={updateValue('PrimaryEmailAddr.Address')}
          />
        </label>
        <label htmlFor="phone">
          <span>Phone</span>
          <input
            type="tel"
            name="PrimaryPhone.FreeFormNumber"
            value={values.PrimaryPhone?.FreeFormNumber || ''}
            onChange={updateValue('PrimaryPhone.FreeFormNumber')}
          />
        </label>
      </fieldset>

      <h3>Billing Address</h3>
      <fieldset className="address">
        <label htmlFor="BillAddr.Line1">
          <span>Address Line 1</span>
          <input
            type="text"
            name="BillAddr.Line1"
            value={values.BillAddr?.Line1 || ''}
            onChange={updateValue('BillAddr.Line1')}
          />
        </label>
        <label htmlFor="BillAddr.Line2">
          <span>Apt/Ste</span>
          <input
            type="text"
            name="BillAddr.Line2"
            value={values.BillAddr?.Line2 || ''}
            onChange={updateValue('BillAddr.Line2')}
          />
        </label>
        <label htmlFor="BillAddr.City">
          <span>City</span>
          <input
            type="text"
            name="BillAddr.City"
            value={values.BillAddr?.City || ''}
            onChange={updateValue('BillAddr.City')}
          />
        </label>
        <label htmlFor="BillAddr.CountrySubDivisionCode">
          <span>State</span>
          <input
            maxLength="2"
            type="list"
            list="states"
            name="BillAddr.CountrySubDivisionCode"
            value={values.BillAddr?.CountrySubDivisionCode || ''}
            onChange={updateValue('BillAddr.CountrySubDivisionCode')}
          />
          <datalist id="states">
            {states.map((state, i) => (
              <option key={`${i}-${state}`}>{state}</option>
            ))}
          </datalist>
        </label>
        <label htmlFor="BillAddr.PostalCode">
          <span>ZIP</span>
          <input
            type="text"
            name="BillAddr.PostalCode"
            value={values.BillAddr?.PostalCode || ''}
            onChange={updateValue('BillAddr.PostalCode')}
          />
        </label>
      </fieldset>
      <h3 className="shipping-head">
        Shiping Address
        <span className="desc">same as billing</span>
        <input
          type="checkbox"
          checked={same}
          onChange={() => {
            setSame((s) => !s);
            dispatch({ type: 'sameAs' });
          }}
        />
      </h3>
      <fieldset className="address" disabled={same}>
        <label htmlFor="ShipAddr.Line1">
          <span>Address Line 1</span>
          <input
            type="text"
            name="ShipAddr.Line1"
            value={values.ShipAddr?.Line1 || ''}
            onChange={updateValue('ShipAddr.Line1')}
          />
        </label>
        <label htmlFor="ShipAddr.Line2">
          <span>Apt/Ste</span>
          <input
            type="text"
            name="ShipAddr.Line2"
            value={values.ShipAddr?.Line2 || ''}
            onChange={updateValue('ShipAddr.Line2')}
          />
        </label>
        <label htmlFor="ShipAddr.City">
          <span>City</span>
          <input
            type="text"
            name="ShipAddr.City"
            value={values.ShipAddr?.City || ''}
            onChange={updateValue('ShipAddr.City')}
          />
        </label>
        <label htmlFor="ShipAddr.CountrySubDivisionCode">
          <span>State</span>
          <input
            maxLength="2"
            type="list"
            list="states"
            name="ShipAddr.CountrySubDivisionCode"
            value={values.ShipAddr?.CountrySubDivisionCode || ''}
            onChange={updateValue('ShipAddr.CountrySubDivisionCode')}
          />
          <datalist id="states">
            {states.map((state, i) => (
              <option key={`${i}-${state}`}>{state}</option>
            ))}
          </datalist>
        </label>
        <label htmlFor="ShipAddr.PostalCode">
          <span>ZIP</span>
          <input
            type="text"
            name="ShipAddr.PostalCode"
            value={values.ShipAddr?.PostalCode || ''}
            onChange={updateValue('ShipAddr.PostalCode')}
          />
        </label>
      </fieldset>
    </CustomerStyles>
  );
};

export default CustomerForm;
