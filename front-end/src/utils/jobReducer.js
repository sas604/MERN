import set from 'lodash/set';
import moveArray from './arrayMove';

export const initialState = {
  customer: '',
  year: '',
  make: '',
  model: '',
  totalParts: '',
  color: [],
  dateRecived: '',
  recived: '',
  shiping: '',
  services: [],
  status: 'inProgress',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'updateValue':
      if (action.field === 'color') {
        if (!action.value) return { ...state };
        return { ...state, color: [...state.color, action.value] };
      }

      return {
        ...set(state, action.field, action.value),
      };
    case 'setCx':
      return { ...state, customer: action.cx };
    case 'setOrder':
      return { ...action.data };
    case 'del':
      if (!state.color.length) {
        return { ...state };
      }
      return {
        ...state,
        color: [...state.color.slice(0, -1)],
      };
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
