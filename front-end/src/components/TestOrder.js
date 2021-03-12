import styled from 'styled-components';

const ColorStyle = styled.div``;
const ListStyle = styled.li`
  list-style: none;
  padding: 1rem;
  background-color: #e3e3e3;
  .order-top {
    display: flex;
  }
`;

const TestOrder = ({ order }) => (
  <ListStyle>
    <div className="order-top">
      <p>{order.invoice}</p>
      <div>
        {order.color.map((color, i) => (
          <ColorStyle key={`${i}-${color}`} color={color} />
        ))}
      </div>
      <p className="name">Boris Jhonson</p>
      <div className="info">
        <span>
          {order.make} {order.model} {order.year}
        </span>
      </div>
      <div>{order.services.map}</div>
    </div>
  </ListStyle>
);
export default TestOrder;
// color: ['#0ccfe9', '#3a34eb', '#eb34ba'],
//   customer: {},
//   dateRecived: '2021-03-12',

//   invoice: 345678, //invoice number will auto generate
//   make: 'Honda',
//   model: 'CBR',
//   recived: 'shiped', //how you got it
//   status: 'Not Started',
//   services: [
//     { name: 'VP', done: false, description: 'optional string of text' },
//     { name: 'TD', done: false, description: 'optional string of text' },
//     { name: 'R/B', done: false, description: 'optional string of text' },
//     { name: 'MP', done: false, description: 'optional string of text' },
//   ],
//   shiping: '',
//   totalParts: 123,
//   updatedAt: '2021-03-11T00:07:08.326Z',
//   year: 2005,
