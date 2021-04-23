import useForm from '../hooks/useForm';
import styled from 'styled-components';

const AddServiceModalStyles = styled.div`
  * + * {
    margin-top: 1rem;
  }
  label {
    display: block;
  }
  h5 {
    margin: 0.5rem 0;
  }
  input,
  textarea,
  select {
    padding: 0.5rem 1rem;
    width: 100%;
  }
  select {
    margin-top: 0.5rem;
    display: block;
    max-width: 200px;
  }
  input {
    text-transform: uppercase;
  }
`;

const AddService = ({ index, dispatch }) => {
  const [values, updateValue, reset] = useForm({
    description: '',
    serviceTag: '',
  });
  return (
    <AddServiceModalStyles>
      <h5>Add Service</h5>
      <label htmlFor="serviceTag">
        Please select a service
        <select
          id="serviceTag"
          name="serviceTag"
          value={values.serviceTag}
          onChange={updateValue}
        >
          <option></option>
          <option value="TD">Tear Down</option>
          <option value="RB">Rebuild</option>
          <option value="CR">Cryo</option>
          <option value="CH">CryoHeat</option>
          <option value="MP">Micropolish</option>
          <option value="MF">Magnaflux</option>
          <option value="VB">Vapor Blasting</option>
        </select>
      </label>

      <label htmlFor="desc">
        Description
        <textarea
          id="desc"
          type="text"
          name="description"
          value={values.description}
          placeholder="Description"
          onChange={updateValue}
        />
      </label>

      <button
        className="button"
        type="button"
        onClick={() => {
          if (!values.serviceTag) {
            console.log('set Error here');
            return;
          }
          dispatch({ type: 'addService', index, form: values });
          reset();
        }}
      >
        ADD SERVICE
      </button>
    </AddServiceModalStyles>
  );
};
export default AddService;
