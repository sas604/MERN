import useForm from '../hooks/useForm';
import styled from 'styled-components';

const AddServiceModalStyles = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const AddService = ({ index, dispatch, close }) => {
  const [values, updateValue] = useForm({ description: '', parts: '' });
  return (
    <AddServiceModalStyles>
      <fieldset>
        <label>
          Service Tag
          <input
            type="text"
            name="serviceTag"
            value={values.serviceTag}
            placeholder="Tag "
            onChange={updateValue}
          />
        </label>

        <label>
          Description
          <input
            type="text"
            name="description"
            value={values.description}
            placeholder="Description"
            onChange={updateValue}
          />
        </label>

        <button
          type="button"
          onClick={() =>
            dispatch({ type: 'addService', index, form: values, close })
          }
        >
          add
        </button>
        <button type="button" onClick={() => close()}>
          cancel
        </button>
      </fieldset>
    </AddServiceModalStyles>
  );
};
export default AddService;
