import set from 'lodash/set';

export const initialState = {
  FullyQualifiedName: '',
  FamilyName: '',
  GivenName: '',
  PrimaryEmailAddr: {
    Address: '',
  },
  DisplayName: '',
  Suffix: '',
  Title: '',
  MiddleName: '',
  PrimaryPhone: {
    FreeFormNumber: '',
  },
  CompanyName: '',
  BillAddr: {
    CountrySubDivisionCode: '',
    City: '',
    PostalCode: '',
    Line1: '',
    Line2: '',
    Country: '',
  },
  ShipAddr: {
    CountrySubDivisionCode: '',
    City: '',
    PostalCode: '',
    Line1: '',
    Line2: '',
    Country: '',
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'updateValue':
      return { ...set(state, action.field, action.value) };
    case 'sameAs':
      return { ...state, ShipAddr: { ...state.BillAddr } };
    case 'load':
      return {
        ...action.data,
      };
    default:
      return;
  }
};
