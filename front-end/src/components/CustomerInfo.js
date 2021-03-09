// accept customer object
const CustomerInfo = ({ readOnly, values, updateValue }) => {
  return (
    <fieldset className="values-info" disabled={readOnly}>
      <h2>Personal Info</h2>
      <label htmlFor="displayedName">
        <input
          type="text"
          name="DisplayName"
          value={values.DisplayName || ''}
          onChange={updateValue('DisplayName')}
          readOnly
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

      <fieldset className="shiping">
        <h2>Shiping Address</h2>
        <label htmlFor="ShipAddr.Line1">
          Address Line 1
          <input
            type="text"
            name="ShipAddr.Line1"
            value={values.ShipAddr?.Line1 || ''}
            onChange={updateValue('ShipAddr.Line1')}
            readOnly={readOnly}
          />
        </label>
        <label htmlFor="ShipAddr.Line2">
          Apt/Ste
          <input
            type="text"
            name="ShipAddr.Line2"
            value={values.ShipAddr?.Line2 || ''}
            onChange={updateValue('ShipAddr.Line2')}
            readOnly={readOnly}
          />
        </label>
        <label htmlFor="ShipAddr.City">
          City
          <input
            type="text"
            name="ShipAddr.City"
            value={values.ShipAddr?.City || ''}
            onChange={updateValue('ShipAddr.City')}
            readOnly={readOnly}
          />
        </label>
        <label htmlFor="ShipAddr.CountrySubDivisionCode">
          State
          <input
            type="text"
            name="ShipAddr.CountrySubDivisionCode"
            value={values.ShipAddr?.CountrySubDivisionCode || ''}
            onChange={updateValue('ShipAddr.CountrySubDivisionCode')}
            readOnly={readOnly}
          />
        </label>
        <label htmlFor="ShipAddr.PostalCode">
          ZIP
          <input
            type="text"
            name="ShipAddr.PostalCode"
            value={values.ShipAddr?.PostalCode || ''}
            onChange={updateValue('ShipAddr.PostalCode')}
            readOnly={readOnly}
          />
        </label>
      </fieldset>
      <fieldset className="billing">
        <h2>Billing Address</h2>
        <label htmlFor="BillAddr.Line1">
          Address Line 1
          <input
            type="text"
            name="BillAddr.Line1"
            value={values.BillAddr?.Line1 || ''}
            onChange={updateValue('BillAddr.Line1')}
            readOnly={readOnly}
          />
        </label>
        <label htmlFor="BillAddr.Line2">
          Apt/Ste
          <input
            type="text"
            name="BillAddr.Line2"
            value={values.BillAddr?.Line2 || ''}
            onChange={updateValue('BillAddr.Line2')}
            readOnly={readOnly}
          />
        </label>
        <label htmlFor="BillAddr.City">
          City
          <input
            type="text"
            name="BillAddr.City"
            value={values.BillAddr?.City || ''}
            onChange={updateValue('BillAddr.City')}
            readOnly={readOnly}
          />
        </label>
        <label htmlFor="BillAddr.CountrySubDivisionCode">
          State
          <input
            type="text"
            name="BillAddr.CountrySubDivisionCode"
            value={values.BillAddr?.CountrySubDivisionCode || ''}
            onChange={updateValue('BillAddr.CountrySubDivisionCode')}
            readOnly={readOnly}
          />
        </label>
        <label htmlFor="BillAddr.PostalCode">
          ZIP
          <input
            type="text"
            name="BillAddr.PostalCode"
            value={values.BillAddr?.PostalCode || ''}
            onChange={updateValue('BillAddr.PostalCode')}
            readOnly={readOnly}
          />
        </label>
      </fieldset>
    </fieldset>
  );
};

export default CustomerInfo;
