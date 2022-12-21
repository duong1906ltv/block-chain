import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ConductTransaction() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(0);

  const navigate = useNavigate();

  const updateRecipient = event => {
    setRecipient(event.target.value)
  }

  const updateAmount = event => {
    setAmount(Number(event.target.value));
  }

  const conductTransaction = async () => {
    await fetch(`${document.location.origin}/api/transact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient, amount })
    }).then(response => response.json())
      .then(json => {
        alert(json.message || json.type);
        navigate('/transaction-pool');
      });
  }

  return (
    <div className='ConductTransaction'>
      <Link to='/'>Home</Link>
      <h3>Conduct a Transaction</h3>
      <div>
        <input
          type='text'
          placeholder='recipient'
          value={recipient}
          onChange={updateRecipient}
        />
      </div>
      <div>
        <input
          type='number'
          placeholder='amount'
          value={amount}
          onChange={updateAmount}
        />
      </div>
      <div>
        <button onClick={conductTransaction}>Submit</button>
      </div>
    </div>
  )
}

export default ConductTransaction;