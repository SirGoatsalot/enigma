import React from 'react';
import Rotor from '../components/rotors/Rotor.jsx';

const Rotors = () => {
  return (<div className='rotors'>
    <Rotor id='left'/>
    <Rotor id='middle'/>
    <Rotor id='right'/>
  </div>);
}

export default Rotors;