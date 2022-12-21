
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Transaction from './Transaction';

function TransactionPool() {
  const [transactionPoolMap, setTransactionPoolMap] = useState({});

  const navigate = useNavigate();

  const POLL_INTERVAL_MS = 1000;

  const fetchMineTransactions = async () => {
    await fetch(`${document.location.origin}/api/mine-transactions`)
      .then(response => {
        if (response.status === 200) {
          alert('success');
          navigate('/blocks');
        } else {
          alert('The mine-transactions block request did not complete.');
        }
      })
  }

  useEffect(() => {
    const fetchPoolMapInterval = setInterval(() => {
      fetch(`${document.location.origin}/api/transaction-pool-map`)
        .then(response => response.json())
        .then(json => setTransactionPoolMap(json));
    }, POLL_INTERVAL_MS)

    return () => clearInterval(fetchPoolMapInterval);
  }, []);

  return (
    <div className='transaction-pool'>
      <h3 className='heading'>Transaction Pool</h3>
      {
        Object.values(transactionPoolMap).map(transaction => {
          return (
            <div key={transaction.id}>
              <hr />
              <Transaction transaction={transaction} />
            </div>
          )
        })
      }
      <hr />
      <button
        onClick={fetchMineTransactions}
      >
        Mine the transactions
      </button>
    </div>
  );
}

export default TransactionPool;