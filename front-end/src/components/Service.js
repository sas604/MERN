const Service = ({ name, parts, dispatch, index, serviceTag }) => {
  return (
    <>
      <fieldset>
        <label>
          Tag
          <input type="text" name="serviceTag" value={serviceTag} readOnly />
        </label>
        <label>
          Service description
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
          <input type="text" name="parts" value={parts} readOnly />
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
