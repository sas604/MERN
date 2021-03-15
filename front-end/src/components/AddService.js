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
  textarea {
    padding: 0.5rem 1rem;
    width: 100%;
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
        Service Tag
        <input
          required
          id="serviceTag"
          type="text"
          name="serviceTag"
          value={values.serviceTag}
          placeholder="Tag "
          onChange={updateValue}
        />
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
