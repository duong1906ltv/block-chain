import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {

  return (
    <div className='navbar'>
      <div className='logo'><img src={logo} alt="" /></div>
      <div><Link to='/'>Home</Link></div>
      <div><Link to='/blocks'>Blocks</Link></div>
      <div><Link to='/conduct-transaction'>Conduct a Transaction</Link></div>
      <div><Link to='/transaction-pool'>Transaction Pool</Link></div>
    </div>
  );
}

export default Navbar;