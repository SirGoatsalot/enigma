const fs = require('fs');
const path = require('path');

// Rotor and relfector config from https://web.stanford.edu/class/cs106j/handouts/36-TheEnigmaMachine.pdf
// Must add more rotors and configs in separate file or db
// see http://www.cryptomuseum.alibaba.sk/crypto/enigma/wiring.htm
const INITIAL_ROTORS_STATE = [
  [
    4, 10, 12, 5, 11, 6, 3, 16,
    21, 25, 13, 19, 14, 22, 24,
    7, 23, 20, 18, 15, 0, 8, 1,
    17, 2, 9
  ],[
    4, 10, 12, 5, 11, 6, 3, 16,
    21, 25, 13, 19, 14, 22, 24,
    7, 23, 20, 18, 15, 0, 8, 1,
    17, 2, 9
  ],[
    4, 10, 12, 5, 11, 6, 3, 16,
    21, 25, 13, 19, 14, 22, 24,
    7, 23, 20, 18, 15, 0, 8, 1,
    17, 2, 9
  ]];
const REFLECTOR_MAP = [
  4,  9, 12, 25,  0, 11, 24, 23,
 21,  1, 22,  5,  2, 17, 16, 20,
 14, 13, 19, 18, 15,  8, 10,  7,
  6,  3
];
const INITIAL_PLUGBOARD_MAP = [
  1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 11, 12, 13, 14, 15, 16,
  17, 18, 19, 20, 21, 22, 23,
  24, 25, 0
];

const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ,'K' ,'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const STATE_PATH = path.join(__dirname, 'state.json');

class enigma {
  constructor(rotors = INITIAL_ROTORS_STATE, plugboard=INITIAL_PLUGBOARD_MAP, reflector=REFLECTOR_MAP) {
    this.rotors = rotors;
    this.plugboard = plugboard;
    this.reflector = reflector;
    this.rotations = [0, 0 ,0];
    this.setState(this.rotors, this.plugboard, this.reflector);
  }

  /**
   * Reset the enigma machine's state to the default,
   * with each rotor set to the 'A' position, and the
   * plugboard set with A -> B, C -> D, E -> F, and so on.
   */
  reset() {
    this.setState(INITIAL_ROTORS_STATE, INITIAL_PLUGBOARD_MAP, REFLECTOR_MAP);
    console.log('reset!');
  }

  /**
   * Update the plugboard in state.json, then update the 
   * current model of the enigma machine.
   * @param {} plugboard 
   * @param {} rotors
   */
  setState(rotors, plugboard, reflector) {
    fs.writeFileSync(STATE_PATH, '{}');
    const newStartingPosition = {rotors, plugboard, reflector};
    fs.writeFileSync(STATE_PATH, JSON.stringify(newStartingPosition));
    this.rotors = rotors;
    this.plugboard = plugboard;
    this.reflector = reflector;
  }

  /**
 * Rotates the given rotor one turn.
 */
  rotate(rotorNum) {
    this.rotations[rotorNum]++;
    if (this.rotations[rotorNum] > 26 && rotorNum != 0) {
      this.rotate(rotorNum - 1);
      this.rotations[rotorNum] = 0;
    }
    const currentRotor = this.rotors[rotorNum];
    currentRotor.forEach((element, index, array) => {
      if (index === 25) array[index] = array[0];
      else array[index] = array[index+1];
    });
  }

  /**
   * Encodes the given message using the enigma's current starting settings.
   * @param {String} message 
   */
  encode(message) {
    const letters = message.toUpperCase().match(/[A-Z]/g);
    for (const letter of letters) {
      // Increment position of rotors, rotate others if needed.
      this.rotate(2);
      
      // Map the letter through the pegboard
      const plugboardOut = this.plugboard[ALPHABET.indexOf(letter)];
      
      // Map the letter through each rotor
      const rotorLeft3 = this.rotors[2][plugboardOut];
      const rotorLeft2 = this.rotors[1][rotorLeft3];
      const rotorLeft1 = this.rotors[0][rotorLeft2];
      const reflectorOut = this.reflector[rotorLeft1];
      const rotorRight1 = this.rotors[0][reflectorOut];
      const rotorRight2 = this.rotors[1][rotorRight1];
      const rotorRight3 = this.rotors[2][rotorRight2];

      // Convert number back to letter
      const finalLetter = ALPHABET[rotorRight3];

      console.log(`${letter} -> ${finalLetter}`);
    }
    this.reset();
  };

  /**
   * decodes the given message using the current settings
   * @param {String} message 
   */
  decode(message) {
    
  }
};

module.exports = enigma;