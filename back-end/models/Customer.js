const mongoose = require('mongoose');

const customerSchema = mongoose.Schema(
  {
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
      CountrySubDivisionCode: String,
      City: String,
      PostalCode: Number,
      Line1: String,
      Country: String,
    },
    Id: Number,
  },
  {
    timestamps: true,
  }
);
customerSchema.index({
  DisplayName: 'text',
  CompanyName: 'text',
});
module.exports = mongoose.model('Customer', customerSchema);
