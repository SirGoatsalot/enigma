const Enigma = require('../models/enigma.js');

const en = new Enigma();
en.reset();
en.encode('Hello, World!');
en.reset();
en.encode('QDKAVNQGGC');