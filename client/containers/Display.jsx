import React from 'react';
import Row from '../components/display/Row.jsx';

const ALPHABET = [['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']];

const Display = (props) => {
  const rows = [];
  for (const row of ALPHABET) rows.push(<Row className='key' letters={row} />);

  return (<div className='display'>
    {rows}
  </div>);
}

export default Display;