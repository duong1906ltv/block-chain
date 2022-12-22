import React, { useEffect, useState } from 'react';

function App() {

  const [walletInfo, setWalletInfo] = useState({});

  useEffect(() => {
    fetch(`${document.location.origin}/api/wallet-info`)
      .then(response => response.json())
      .then(json => setWalletInfo(json));
  }, []);

  const { address, balance } = walletInfo;

  return (
    <div className='home'>
      <div className='heading'>Welcome to the blockchain...</div>
      <div className='wallet-info'>
        <div><span>Name123456:</span> <span>{address}</span></div>
        <div><span>Balance:</span> <span>{balance}</span></div>
      </div>
    </div>
  );
}

export default App;