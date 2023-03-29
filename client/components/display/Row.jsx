import React from 'react';
import Key from './Key.jsx';

const Row = (props) => {
  const keys = [];
  for (const letter of props.letters) keys.push(<Key id={letter} />);

  return (<div className='display_row' id={props.id}>
    {keys}
  </div>);
}

export default Row;