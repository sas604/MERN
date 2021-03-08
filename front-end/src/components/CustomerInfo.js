import useForm from '../hooks/useForm';

// accept customer object
const CustomerInfo = ({
  defaults = {
    domain: 'QBO',

    FamilyName: 'Lauterbach',
    DisplayName: "Amy's Bird Sanctuary",
    DefaultTaxCodeRef: {
      value: '2',
    },
    PrimaryEmailAddr: {
      Address: 'Birds@Intuit.com',
    },
    PreferredDeliveryMethod: 'Print',
    GivenName: 'Amy',
    FullyQualifiedName: "Amy's Bird Sanctuary",
    BillWithParent: false,
    Job: false,
    BalanceWithJobs: 274.0,
    PrimaryPhone: {
      FreeFormNumber: '(650) 555-3311',
    },
    Active: true,
    MetaData: {
      CreateTime: '2014-09-11T16:48:43-07:00',
      LastUpdatedTime: '2015-07-01T10:14:15-07:00',
    },
    BillAddr: {
      City: 'Bayshore',
      Line1: '4581 Finch St.',
      PostalCode: '94326',
      Lat: 'INVALID',
      Long: 'INVALID',
      CountrySubDivisionCode: 'CA',
      Id: '2',
    },
    MiddleName: 'Michelle',
    Notes: 'Note added via Update operation.',
    Taxable: true,
    Balance: 274.0,
    SyncToken: '5',
    CompanyName: "Amy's Bird Sanctuary",
    ShipAddr: {
      City: 'Bayshore',
      Line1: '4581 Finch St.',
      PostalCode: '94326',
      Lat: 'INVALID',
      Long: 'INVALID',
      CountrySubDivisionCode: 'CA',
      Id: '109',
    },
    PrintOnCheckName: "Amy's Bird Sanctuary",
    sparse: false,
    Id: '1',
  },
}) => {
  const [values, updateValue] = useForm(defaults);

  return (
    <fieldset className="values-info" disabled>
      <h2>Personal Info</h2>
      <label htmlFor="displayedName">
        <input
          type="text"
          name="displayedName"
          value={values.DisplayName}
          onChange={updateValue}
        ></input>
      </label>
      <label htmlFor="company">
        <span>Business Name</span>
        <input
          type="text"
          name="company"
          value={values.CompanyName || 'not set'}
          onChange={updateValue}
        />
      </label>
      <label htmlFor="first-name">
        <span>Contact First Name</span>
        <input
          type="text"
          name="first-name"
          value={values.GivenName || 'not set'}
          onChange={updateValue}
        />
      </label>
      <label htmlFor="last-name">
        <span>Contact Last Name</span>
        <input
          type="text"
          name="last-name"
          value={values.FamilyName || 'not set'}
          onChange={updateValue}
        />
      </label>
      <label htmlFor="email">
        <span>Email</span>
        <input
          type="email"
          name="PrimaryEmailAddr.Address"
          value={values.PrimaryEmailAddr.Address || 'not set'}
          onChange={updateValue}
        />
      </label>
      <label htmlFor="phone">
        <span>Phone</span>
        <input
          type="tel"
          name="PrimaryPhone.FreeFormNumber"
          value={values.PrimaryPhone.FreeFormNumber || 'not set'}
          onChange={updateValue}
        />
      </label>

      <fieldset className="shiping">
        <h2>Shiping Address</h2>
        <label htmlFor="ShipAddr.Line1">
          Address Line 1
          <input
            type="text"
            name="ShipAddr.Line1"
            value={values.ShipAddr.Line1}
          />
        </label>
        <label htmlFor="ShipAddr.Line2">
          Apt/Ste
          <input
            type="text"
            name="ShipAddr.Line2"
            value={values.ShipAddr.Line2}
          />
        </label>
        <label htmlFor="ShipAddr.City">
          City
          <input
            type="text"
            name="ShipAddr.City"
            value={values.ShipAddr.City}
          />
        </label>
        <label htmlFor="ShipAddr.CountrySubDivisionCode">
          State
          <input
            type="text"
            name="ShipAddr.CountrySubDivisionCode"
            value={values.ShipAddr.CountrySubDivisionCode}
          />
        </label>
        <label htmlFor="ShipAddr.PostalCode">
          ZIP
          <input
            type="text"
            name="ShipAddr.PostalCode"
            value={values.ShipAddr.PostalCode}
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
            value={values.BillAddr.Line1}
          />
        </label>
        <label htmlFor="BillAddr.Line2">
          Apt/Ste
          <input
            type="text"
            name="BillAddr.Line2"
            value={values.BillAddr.Line2}
          />
        </label>
        <label htmlFor="BillAddr.City">
          City
          <input
            type="text"
            name="BillAddr.City"
            value={values.BillAddr.City}
          />
        </label>
        <label htmlFor="BillAddr.CountrySubDivisionCode">
          State
          <input
            type="text"
            name="BillAddr.CountrySubDivisionCode"
            value={values.BillAddr.CountrySubDivisionCode}
          />
        </label>
        <label htmlFor="BillAddr.PostalCode">
          ZIP
          <input
            type="text"
            name="BillAddr.PostalCode"
            value={values.BillAddr.PostalCode}
          />
        </label>
      </fieldset>
    </fieldset>
  );
};

export default CustomerInfo;
