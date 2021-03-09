import styled from 'styled-components';
import { MdPhotoCamera } from 'react-icons/md';
import { Link } from 'react-router-dom';
const OrderStyles = styled.div`
  border: 1px solid black;
  margin: 1rem;
  display: flex;
  & > * {
    flex: 2;
  }
  .color {
    flex: 1;
    display: block;
    background-color: ${(props) => props.color || 'red'};
  }
  .order-list {
    flex: 5;
    margin: 0;
    padding: 0;
    display: flex;
    & li {
      list-style: none;
      margin: 0.5rem;
    }
  }
  button {
    flex: 1;
    display: flex;
    align-items: center;
    & svg {
      height: 50%;
      flex: 1;
    }
  }
`;

const Order = ({ order }) => {
  return (
    <OrderStyles color={order.color}>
      <span className="color"></span>
      <p className="invoice">#4567783</p>
      <p> {order.customer.DisplayName} </p>
      <button type="button">
        <MdPhotoCamera />
      </button>
      <ul className="order-list">
        {order?.services.map((ser) => (
          <li key={ser._id}>
            <label>
              <input type="checkbox" checked={ser.done} />
              {ser.name}
            </label>
            <p>{ser.parts}</p>
          </li>
        ))}
      </ul>
    </OrderStyles>
  );
};
export default Order;

// photos
// :
// []
// _id
// :
// "6047de8228fe19459cd45f0e"
// customer
// :
// "60471dad0e884358e4e8b23b"
// year
// :
// 2003
// make
// :
// "suzuki"
// model
// :
// "ctn "
// totalParts
// :
// 123
// recived
// :
// "dropoff"
// shiping
// :
// "deliver"

// services
// :
// [{…}, {…}, {…}, {…}]
// invoice
// :
// ""
