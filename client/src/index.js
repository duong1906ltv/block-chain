import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './components/App';
import Blocks from './components/Blocks';
import ConductTransaction from './components/ConductTransaction';
import TransactionPool from './components/TransactionPool';
import './index.css';

const root = createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript
root.render(
  <Router >
    <Routes>
      <Route exact path='/' element={<App />} />
      <Route path='/blocks' element={<Blocks />} />
      <Route path='/conduct-transaction' element={<ConductTransaction />} />
      <Route path='/transaction-pool' element={<TransactionPool />} />
    </Routes>
  </Router>

);