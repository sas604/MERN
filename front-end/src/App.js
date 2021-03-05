import './App.css';

import useForm from './hooks/useForm';

import { useEffect, useState } from 'react';
import SearchCustomer from './components/SearchCustomer';
import CreateCustomer from './components/CreateCustomer';

function App() {
  const [name, setName] = useState('');
  const [newCx, setNewCX] = useState(false);
  if (newCx) {
    return <CreateCustomer close={() => setNewCX(false)} />;
  }
  return (
    <div className="App">
      <header className="App-header">
        <h2>Create new job order</h2>
        <SearchCustomer setName={setName} />
        <div style={{ border: '1px solid white', margin: '3rem' }}>
          <h3>Or Create a new Customer </h3>
          <button onClick={() => setNewCX(true)}>Create new customer </button>
        </div>
        <button
          onClick={() =>
            fetch('http://localhost:5000/api/login')
              .then((response) => response.json())
              .then((res) => (window.location = res))
          }
        >
          log to quickbooks
        </button>
      </header>
    </div>
  );
}

export default App;
