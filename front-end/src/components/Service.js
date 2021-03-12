const Service = ({ description, dispatch, index, serviceTag }) => {
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
            name="description"
            value={description}
            placeholder="Service name"
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
