import React from 'react';
import Rotors from './Rotors.jsx';
import Plugboard from './Plugboard.jsx';
import Display from './Display.jsx';

const App = () => {
  return (
    <div>
      <Rotors />
      <Display />
      <Plugboard />
    </div>
  );
};

export default App;