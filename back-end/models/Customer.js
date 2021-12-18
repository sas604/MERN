const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  FullyQualifiedName: String,
  FamilyName: String,
  GivenName: String,
  PrimaryEmailAddr: {
    Address: String,
  },
  DisplayName: {
    type: String,
    required: 'you must supply a name ',
    unique: true,
  },
  Suffix: String,
  Title: String,
  MiddleName: String,
  PrimaryPhone: {
    FreeFormNumber: String,
  },
  CompanyName: String,
  BillAddr: {
    CountrySubDivisionCode: {
      type: String,
    },
    City: String,
    PostalCode: String,
    Line1: String,
    Line2: String,
    Country: String,
  },
  ShipAddr: {
    CountrySubDivisionCode: String,
    City: String,
    PostalCode: String,
    Line1: String,
    Line2: String,
    Country: String,
  },
  Id: Number,
  SyncToken: Number,
});
customerSchema.index({
  DisplayName: 'text',
  CompanyName: 'text',
  'PrimaryPhone.FreeFormNumber': 'text',
  FamilyName: 'text',
  GivenName: 'text',
});

module.exports = mongoose.model('Customer', customerSchema);
