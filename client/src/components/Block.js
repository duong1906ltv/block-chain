import React, { useState } from 'react';
import Transaction from './Transaction';

function Block({ block }) {

  const [displayTransaction, setDisplayTransaction] = useState(false);

  const toggleTransaction = () => {
    setDisplayTransaction(current => !current);
  }

  const { data, timestamp, hash } = block;
  const hashDisplay = `${hash.substring(0, 15)}...`;

  const getDisplayTransaction = () => {
    const stringifiedData = JSON.stringify(data);

    const dataDisplay = stringifiedData.length > 35 ?
      `${stringifiedData.substring(0, 35)}...` :
      stringifiedData;

    if (displayTransaction) {
      return (
        <div>
          {
            data.map(transaction => (
              <div key={transaction.id}>
                <hr />
                <Transaction transaction={transaction} />
              </div>
            ))
          }
          <br />
          <button
            onClick={toggleTransaction}
          >
            Show Less
          </button>
        </div>
      )
    }

    return (
      <div>
        <div>Data: {dataDisplay}</div>
        <button
          onClick={toggleTransaction}
        >
          Show More
        </button>
      </div>
    );
  }

  return (
    <div className='Block'>
      <div>Hash: {hashDisplay}</div>
      <div>Timestamp: {new Date(timestamp).toLocaleString()}</div>
      {getDisplayTransaction()}
    </div>
  )
}

export default Block;