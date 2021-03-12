import styled from 'styled-components';
import TestOrder from './TestOrder';

const posible = [
  'Not Started',
  'Tear Down',
  'Waiting For Parts',
  'MP',
  'VP',
  'C',
  'H',
  'On hold',
  'Ready',
];

const testWorkOrder = {
  color: ['#0ccfe9', '#3a34eb', '#eb34ba'],
  customer: {},
  dateRecived: '2021-03-12',

  invoice: 345678, //invoice number will auto generate
  make: 'Honda',
  model: 'CBR',
  recived: 'shiped', //how you got it
  status: 'Not Started',
  services: [
    { name: 'VP', done: false, description: 'optional string of text' },
    { name: 'TD', done: false, description: 'optional string of text' },
    { name: 'R/B', done: false, description: 'optional string of text' },
    { name: 'MP', done: false, description: 'optional string of text' },
  ],
  shiping: '',
  totalParts: 123,
  updatedAt: '2021-03-11T00:07:08.326Z',
  year: 2005,
};
const DashStyle = styled.div`
  ul {
    padding: 0;
  }
  li + li {
    margin-top: 1rem;
  }
`;
const TestDash = () => {
  const arr = Array.from(Array(10).keys()).map((el) => testWorkOrder);
  console.log(arr);
  return (
    <DashStyle>
      <h1>Dashboard</h1>
      <ul className="list">
        {arr.map((order, i) => (
          <TestOrder order={order} key={i} />
        ))}
      </ul>
    </DashStyle>
  );
};

export default TestDash;
