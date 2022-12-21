import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className='conduct-transaction'>
      <h3 className='heading'>Conduct a Transaction</h3>
      <div className='form'>
        <div className='form-group'>
          <label htmlFor="recipient">Recipient</label>
          <input
            id='recipient'
            type='text'
            placeholder='recipient'
            value={recipient}
            onChange={updateRecipient}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor="amount">Amount</label>
          <input
            id='amount'
            type='number'
            placeholder='amount'
            value={amount}
            onChange={updateAmount}
            required
          />
        </div>
        <div className='form-button'>
          <button onClick={conductTransaction}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default ConductTransaction;