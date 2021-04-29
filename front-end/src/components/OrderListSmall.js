import styled from 'styled-components';

const OrderStyle = styled.div`
  ul {
    padding: 0;
  }
  li {
    :not(:first-of-type) {
      margin-top: 1rem;
    }
    padding: 0.5rem 1rem;
    background-color: white;
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    align-items: center;
    p {
      span {
        color: var(--gray);
        display: block;
        font-size: 0.8rem;
      }
      text-transform: capitalize;
    }
    div {
      display: flex;
    }
  }
`;

const OrderListSmall = ({ orders }) => (
  <OrderStyle>
    <h2>Past Work Orders</h2>
    <ul>
      {orders.map((order, i) => (
        <li key={i}>
          <p>
            <span>Invoice:</span>#{order.invoice}
          </p>
          <div style={{ width: 40, alignSelf: 'stretch' }}>
            {order.color.map((color, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: color,
                  flex: 1,
                  alignSelf: 'stretch',
                }}
              />
            ))}
          </div>
          <div style={{ gap: 5 }}>
            {order.services.map((ser, i) => (
              <strong>
                <p key={i}>{ser.serviceTag}</p>
              </strong>
            ))}
          </div>
          <p>
            <span>Status:</span>
            {order.status}
          </p>
          {order.tracking && (
            <p>
              <span>Tracking number:</span>
              <a href={`https://google.com/search?q=${order.tracking}`}>
                {order.tracking}
              </a>
            </p>
          )}
        </li>
      ))}
    </ul>
  </OrderStyle>
);

export default OrderListSmall;
