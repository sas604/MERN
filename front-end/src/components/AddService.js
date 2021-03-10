import useForm from '../hooks/useForm';
import styled from 'styled-components';

const AddServiceModalStyles = styled.div`
  position: absolute;
  background-color: black;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddService = ({ index, dispatch, close }) => {
  const [values, updateValue] = useForm({ name: '', parts: '' });
  return (
    <AddServiceModalStyles>
      <fieldset>
        <label>
          Service
          <input
            type="text"
            name="name"
            value={values.name}
            placeholder="Service name"
            onChange={updateValue}
          />
        </label>
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
          Parts
          <input
            type="text"
            name="parts"
            value={values.parts}
            placeholder="parts"
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
