const Enigma = require('../models/enigma.js');

const en = new Enigma();

// en.set(null, 'CCC', null, null);
en.set(null, 'AAA', null, null);

en.log(true, true, false, false);
en.encode('ABC');

en.set(null, 'AAA', null, null);

en.log(true, true, false, false);
en.encode('OBI');
