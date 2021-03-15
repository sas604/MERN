import set from 'lodash/set';
import moveArray from './arrayMove';

export const initialState = {
  customer: '',
  year: '',
  make: '',
  model: '',
  totalParts: '',
  color: ['#ffffff00', '#ffffff00', '#ffffff00'],
  dateRecived: '',
  recived: '',
  shiping: '',
  services: [],
  invoice: '',
  status: 'inProgress',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'updateValue':
      if (action.field === 'color') {
        state.color[0] = action.value;
        return { ...state };
      }
      if (action.field === 'color-1') {
        state.color[1] = action.value;

        return { ...state };
      }
      if (action.field === 'color-2') {
        state.color[2] = action.value;

        return { ...state };
      }
      return {
        ...set(state, action.field, action.value),
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
