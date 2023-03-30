const fs = require('fs');
const path = require('path');

const ROTORS_PATH = path.join(__dirname, 'rotors.json');
const ROTOR_SETTINGS = JSON.parse(fs.readFileSync(ROTORS_PATH));

const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ,'K' ,'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class enigma {
  /**
   * Create a new enigma machine, and initialize its settings to the default (can be changed in rotors.json):
   * Rotors: I, II, III
   * Rotor Positions: A, A, A
   * Reflector: UKW_A
   * Plugboard: 'BCDEFGHIJKLMNOPQRSTUVWXYZA'
   */
  constructor() {
    this.rotors = [];
    this.plugboard = [];
    this.reflector = [];
    this.rotorPositions = [0, 0 ,0];

    const defaults = ROTOR_SETTINGS.defaults;
    this.set(defaults.rotors, defaults.rotorsSetting, defaults.reflector, defaults.plugboard);
  }

  /**
   * Helper function to convert a rotor setting string into
   * a positional array for ease of use.
   * @param {string} setting 
   */
  convertToNums(setting) {
    const result = [];
    for (const letter of setting.split('')) result.push(ALPHABET.indexOf(letter));
    return result;
  }

  /**
   * Set the enigma machine's rotors, reflector, and plugboard. Set any argument to null to leave its setting unchanged.
   * 
   * @param {String[]} rotors Array of roman numerals (I-V) representing the wheels, with the fastest rotor at index 2 and the slowest at index 0. 
   *  ex: ['IV', 'III', 'II']
   * @param {String} rotorPositions String representing the rotor configuration. 
   *  ex: 'ABC'
   * @param {String} reflector String name of relfector module to use, beginning with 'UKW'. 
   *  ex: 'UKW_B'
   * @param {String} plugboard String of plugboard connections, where each pair of letters is a connection.
   *  ex: 'AB CD EF'
   */
  set(rotors, rotorPositionsParam, reflector, plugboard) {
    if (rotors) {
      rotors.forEach((element, index) => {
        this.rotors[index] = this.convertToNums(ROTOR_SETTINGS[element]);
      });
    }
    if (rotorPositionsParam) {
      // find difference between old and new rotors
      // rotate the rotors that number of times
      const newRotorPositions = this.convertToNums(rotorPositionsParam);
      const rotorPositionDiff = this.rotorPositions.map((oldPosition, rotor) => newRotorPositions[rotor] - oldPosition);
      rotorPositionDiff.forEach((diff, rotor, array) => {
        console.log('Position diff: ', diff);
        if (diff < 0) diff += 26;
        console.log('Rotations: ', diff);
        for (let i = 0; i < diff; i++) this.rotate(rotor, false);
      });
    }
    if (plugboard) {
      const newPlugboard = {};
      const plugboardSplit = plugboard.split(' ');
      plugboardSplit.forEach((element, index, array) => {
        const firstInd = ALPHABET.indexOf(element[0]);
        const secondInd = ALPHABET.indexOf(element[1]);
        newPlugboard[firstInd] = secondInd;
        newPlugboard[secondInd] = firstInd;
      });
      this.plugboard = newPlugboard;
    }
    
    this.reflector = reflector ? this.convertToNums(ROTOR_SETTINGS[reflector]) : this.reflector; 
  }

  /**
   * Log information about this enigma machine. Set the params true for each item to log.
   * 
   * @param {*} rotors 
   * @param {*} rotorPositions 
   * @param {*} reflector 
   * @param {*} plugboard 
   */
  log(rotors, rotorPositions, reflector, plugboard) {
    console.log(`---- ENIGMA LOG BEGIN ----`);
    if (rotors) console.log(`Rotors: `, this.rotors);
    if (rotorPositions) console.log(`Rotor Positions: `, this.rotorPositions);
    if (reflector) console.log(`Reflector: `, this.reflector);
    if (plugboard) console.log(`Plugboard: `, this.plugboard);
    console.log(`----- ENIGMA LOG END -----`);
  }

  /**
 * Rotates the given rotor one turn.
 * 
 * @param {int} rotorNum
 * @param {boolean} cascade whether or not the turning of this rotor should affect other rotors
 */
  rotate(rotorNum, cascade) {
    // Keep track of how many times each rotor has been changed
    this.rotorPositions[rotorNum] += 1;
    // if a rotor does a full 360, reset its counter to 0 and rotate the rotor next to it
    if (this.rotorPositions[rotorNum] > 25) {
      this.rotorPositions[rotorNum] = 0;
      if (cascade && rotorNum !== 0) this.rotate(rotorNum - 1, cascade);
    }

    // rotate the rotor by moving everything back one index
    const currentRotor = this.rotors[rotorNum];
    currentRotor.push(currentRotor.shift());
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
  };

  /**
   * decodes the given message using the current settings
   * @param {String} message 
   */
  decode(message) {

  }
};

module.exports = enigma;