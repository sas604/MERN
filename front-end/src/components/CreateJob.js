import React from 'react';
import useForm from '../hooks/useForm';

const CreateJob = ({
  cx = {
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
  //const { value, updateValue } = useForm(defaults);
  //collect inforamation about the job
  // send it to the server

  return (
    <form>
      <fieldset className="cx-info">
        <h2>Personal Info</h2>
        <label htmlFor="displayedName">
          <input
            type="text"
            readOnly
            name="displayedName"
            value={cx.DisplayName}
          ></input>
        </label>
        <label htmlFor="company">
          <h3>Business Name</h3>
          <input
            type="text"
            name="company"
            value={cx.CompanyName || 'not set'}
            readOnly
          />
        </label>
        <label htmlFor="first-name">
          <h3>Contact First Name</h3>
          <input
            type="text"
            name="first-name"
            value={cx.GivenName || 'not set'}
            readOnly
          />
        </label>
        <label htmlFor="last-name">
          <h3>Contact First Name</h3>
          <input
            type="text"
            name="last-name"
            value={cx.FamilyName || 'not set'}
            readOnly
          />
        </label>
        <label htmlFor="email">
          <h3>Email</h3>
          <input
            type="email"
            name="email"
            value={cx.PrimaryEmailAddr.Address || 'not set'}
            readOnly
          />
        </label>
        <label htmlFor="phone">
          <h3>Email</h3>
          <input
            type="tel"
            name="phone"
            value={cx.PrimaryPhone.FreeFormNumber || 'not set'}
            readOnly
          />
        </label>
        <fieldset className="address"></fieldset>
      </fieldset>
    </form>
  );
};

export default CreateJob;
