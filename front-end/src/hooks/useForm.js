import { useState } from 'react';
import set from 'lodash/set';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // check if its a number
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = +value;
    }

    setValues({
      ...set(values, e.target.name, value),
    });
  }

  const reset = () => setValues(defaults);
  return [values, updateValue, reset];
}
