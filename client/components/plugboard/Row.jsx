import React from 'react';
import Plug from './Plug.jsx';

const Row = (props) => {
  const plugs = [];
  for (const letter of props.letters) plugs.push(<Plug id={letter} />);

  return (<div className='plugboard_row' id={props.id}>
    {plugs}
  </div>);
}

export default Row;