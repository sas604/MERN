import styled from 'styled-components';
import {
  MdDeleteForever,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from 'react-icons/md';
const ServiceStyles = styled.div`
  &:not(:first-of-type) {
    margin-top: 1rem;
  }
  background-color: white;
  display: flex;
  align-items: stretch;

  p {
    margin: 0.5rem 1rem;
  }
  .service-tag {
    padding: 0.5rem 1rem;
    margin: unset;
    align-self: stretch;
    background-color: var(--black);
    color: white;
    text-transform: uppercase;
    font-size: 1.5rem;
    span {
      text-transform: capitalize;
    }
  }
  button {
    margin-left: auto;
    color: var(--red);
    font-size: 1.5rem;
    background-color: transparent;
    border: unset;
    align-self: center;
    cursor: pointer;
  }
  .controls {
    button {
      display: flex;
      justify-content: center;
      align-content: center;
      color: var(--black);
    }
    button + button {
      border-top: 1px solid var(--black);
    }
  }
`;
const Service = ({ description, dispatch, index, serviceTag }) => {
  return (
    <ServiceStyles>
      <div className="controls">
        <button
          type="button"
          onClick={() => dispatch({ type: 'sort', index, pos: -1 })}
        >
          <MdKeyboardArrowUp />
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'sort', index, pos: 1 })}
        >
          <MdKeyboardArrowDown />
        </button>
      </div>
      <p className="service-tag">
        <span className="desc">Tag</span>
        {serviceTag}
      </p>
      <p>
        <span className="desc">Service description</span>
        {description}
      </p>
      <button
        type="button"
        onClick={() => dispatch({ type: 'removeService', index })}
      >
        <MdDeleteForever />
      </button>
    </ServiceStyles>
  );
};
export default Service;
