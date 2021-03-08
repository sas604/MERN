const Service = ({ name, parts, dispatch, index }) => {
  return (
    <>
      <fieldset>
        <label>
          Service
          <input
            type="text"
            name="service"
            value={name}
            placeholder="Service name"
            readOnly
          />
        </label>
        <label>
          Parts
          <input
            type="text"
            name="parts"
            value={parts}
            placeholder="parts"
            readOnly
          />
        </label>

        <button
          type="button"
          onClick={() => dispatch({ type: 'removeService', index })}
        >
          DEL
        </button>
      </fieldset>
    </>
  );
};
export default Service;
