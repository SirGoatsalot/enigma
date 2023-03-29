const fs = require('fs');

const INITIAL_PLUGBOARD_MAP = {
  'A': 'B', 
  'C': 'D',
  'E': 'F', 
  'G': 'H',
  'I': 'J', 
  'K': 'L', 
  'M': 'N', 
  'O': 'P', 
  'Q': 'R', 
  'S': 'T', 
  'U': 'V', 
  'W': 'X', 
  'Y': 'Z',
};

const INITIAL_ROTORS_STATE = [0, 0, 0];

// Rotor config from https://web.stanford.edu/class/cs106j/handouts/36-TheEnigmaMachine.pdf
// Must add more rotors and configs in separate file or db
const ROTOR_CONNECTION_MAP = {
  'A': 'E',
  'B': 'K',
  'C': 'M',
  'D': 'F',
  'E': 'L',
  'F': 'G',
  'G': 'D',
  'H': 'Q',
  'I': 'V',
  'J': 'Z',
  'K': 'N',
  'L': 'T',
  'M': 'O',
  'N': 'W',
  'O': 'Y',
  'P': 'H',
  'Q': 'X',
  'R': 'U',
  'S': 'S',
  'T': 'P',
  'U': 'A',
  'V': 'I',
  'W': 'B',
  'X': 'R',
  'Y': 'C',
  'Z': 'J',
};

const enigma = {
  plugboard: INITIAL_PLUGBOARD_MAP,
  rotors: INITIAL_ROTORS_STATE
};

enigma.reset = () => {
  plugboard = INITIAL_PLUGBOARD_MAP;
  rotors = INITIAL_ROTORS_STATE;
}

enigma.update = () => {
  fs.readFileSync('state.json');

}

enigma.setBoard = () => {

}

enigma.setRotors = () => {

}

enigma.encode = () => {
  
}

enigma.decode = () => {

}

export default enigma;