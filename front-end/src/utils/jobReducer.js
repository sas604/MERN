import set from 'lodash/set';
import moveArray from './arrayMove';

export const initialState = {
  customer: '',
  year: '',
  make: '',
  model: '',
  totalParts: '',
  color: '#000000',
  dateRecived: '',
  recived: '',
  shiping: '',
  services: [],
  invoice: '',
  status: '',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'updateValue':
      return {
        ...set(state, action.field, action.value),
        status: state.dateRecived ? 'inProgress' : 'notRecived',
      };
    case 'setCx':
      return { ...state, customer: action.cx };
    case 'sort':
      return {
        ...state,
        services: moveArray(state.services, action.pos, action.index),
      };

    case 'addService':
      return { ...state, services: [...state.services, { ...action.form }] };
    case 'removeService':
      return {
        ...state,
        services: state.services.filter(
          (el) => el !== state.services[action.index]
        ),
      };

    default:
      return;
  }
};
