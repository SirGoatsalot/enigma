import React from 'react';
import Row from '../components/plugboard/Row.jsx';

const ALPHABET = [['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']];

const Plugboard = () => {
  const rows = [];
  for (const row of ALPHABET) rows.push(<Row className='plugboard_row' letters={row} />);
  return (<div className='plugboard'>
    {rows}
  </div>);
}

export default Plugboard;