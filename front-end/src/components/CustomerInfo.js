// accept customer object

import styled from 'styled-components';

const CustomerStyles = styled.div`
  margin: 1rem;
  padding: 1rem;
  background-color: #f6f6f6;
  display: flex;
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
`;

const CustomerInfo = ({
  readOnly = false,
  values,
  updateValue = (f) => (e) => e.target,
  DisplayName,
  children,
}) => {
  return (
    <>
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
              readOnly={!DisplayName}
            ></input>
          </label>

          <label htmlFor="company">
            <span>Business Name</span>
            <input
              type="text"
              name="CompanyName"
              value={values.CompanyName}
              onChange={updateValue('CompanyName')}
              readOnly={readOnly}
            />
          </label>
          <label htmlFor="first-name">
            <span>Contact First Name</span>
            <input
              type="text"
              name="GivenName"
              value={values.GivenName}
              onChange={updateValue('GivenName')}
              readOnly={readOnly}
            />
          </label>
          <label htmlFor="last-name">
            <span>Contact Last Name</span>
            <input
              type="text"
              name="FamilyName"
              value={values.FamilyName}
              onChange={updateValue('FamilyName')}
              readOnly={readOnly}
            />
          </label>
          <label htmlFor="email">
            <span>Email</span>
            <input
              type="email"
              name="PrimaryEmailAddr.Address"
              value={values.PrimaryEmailAddr.Address || ''}
              onChange={updateValue('PrimaryEmailAddr.Address')}
              readOnly={readOnly}
            />
          </label>
          <label htmlFor="phone">
            <span>Phone</span>
            <input
              type="tel"
              name="PrimaryPhone.FreeFormNumber"
              value={values.PrimaryPhone?.FreeFormNumber || ''}
              onChange={updateValue('PrimaryPhone.FreeFormNumber')}
              readOnly={readOnly}
            />
          </label>
        </fieldset>
        <h3>Shiping Address </h3>
        <fieldset className="address">
          <label htmlFor="ShipAddr.Line1">
            <span>Address Line 1</span>
            <input
              type="text"
              name="ShipAddr.Line1"
              value={values.ShipAddr?.Line1 || ''}
              onChange={updateValue('ShipAddr.Line1')}
              readOnly={readOnly}
            />
          </label>
          <label htmlFor="ShipAddr.Line2">
            <span>Apt/Ste</span>
            <input
              type="text"
              name="ShipAddr.Line2"
              value={values.ShipAddr?.Line2 || ''}
              onChange={updateValue('ShipAddr.Line2')}
              readOnly={readOnly}
            />
          </label>
          <label htmlFor="ShipAddr.City">
            <span>City</span>
            <input
              type="text"
              name="ShipAddr.City"
              value={values.ShipAddr?.City || ''}
              onChange={updateValue('ShipAddr.City')}
              readOnly={readOnly}
            />
          </label>
          <label htmlFor="ShipAddr.CountrySubDivisionCode">
            <span>State</span>
            <input
              type="text"
              name="ShipAddr.CountrySubDivisionCode"
              value={values.ShipAddr?.CountrySubDivisionCode || ''}
              onChange={updateValue('ShipAddr.CountrySubDivisionCode')}
              readOnly={readOnly}
            />
          </label>
          <label htmlFor="ShipAddr.PostalCode">
            <span>ZIP</span>
            <input
              type="text"
              name="ShipAddr.PostalCode"
              value={values.ShipAddr?.PostalCode || ''}
              onChange={updateValue('ShipAddr.PostalCode')}
              readOnly={readOnly}
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
              readOnly={readOnly}
            />
          </label>
          <label htmlFor="BillAddr.Line2">
            <span>Apt/Ste</span>
            <input
              type="text"
              name="BillAddr.Line2"
              value={values.BillAddr?.Line2 || ''}
              onChange={updateValue('BillAddr.Line2')}
              readOnly={readOnly}
            />
          </label>
          <label htmlFor="BillAddr.City">
            <span>City</span>
            <input
              type="text"
              name="BillAddr.City"
              value={values.BillAddr?.City || ''}
              onChange={updateValue('BillAddr.City')}
              readOnly={readOnly}
            />
          </label>
          <label htmlFor="BillAddr.CountrySubDivisionCode">
            <span>State</span>
            <input
              type="text"
              name="BillAddr.CountrySubDivisionCode"
              value={values.BillAddr?.CountrySubDivisionCode || ''}
              onChange={updateValue('BillAddr.CountrySubDivisionCode')}
              readOnly={readOnly}
            />
          </label>
          <label htmlFor="BillAddr.PostalCode">
            <span>ZIP</span>
            <input
              type="text"
              name="BillAddr.PostalCode"
              value={values.BillAddr?.PostalCode || ''}
              onChange={updateValue('BillAddr.PostalCode')}
              readOnly={readOnly}
            />
          </label>
        </fieldset>
        {children}
      </CustomerStyles>
    </>
  );
};

export default CustomerInfo;
