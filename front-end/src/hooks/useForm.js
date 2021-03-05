import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // check if its a number
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = +value;
    }
    setValues({
      ...values,
      [e.target.name]: value,
    });
  }
  return { values, updateValue };
}