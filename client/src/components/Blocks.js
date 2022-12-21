import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Block from './Block';

function Blocks() {
  const [blocks, setBlocks] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/blocks')
      .then(response => response.json())
      .then(json => setBlocks(json));
  }, []);

  return (
    <div>
      <div><Link to='/'>Home</Link></div>
      <h3>Blocks</h3>
      {
        blocks.map(block => {
          return (
            <Block key={block.hash} block={block}>{block.hash}</Block>
          )
        })
      }
    </div>
  );
}

export default Blocks;