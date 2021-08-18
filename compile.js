// s38: compile code will go here
const path = require('path');
const fs = require('fs');
const solc = require('solc');
const { compile } = require('solc');

// s38: __dirname is a constant that will always take you to working directory
// this line of code generates a path that points directly to Inbox.sol file
// using this function ensures this path works on either windows or unix based systems
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
// s38: i do not understand this line of code
const source = fs.readFileSync(inboxPath, 'utf8');

// s38: calling solc module to compile source code from file system and number of contracts (in this case one contract)
// console.log(solc.compile(source, 1));

// s40: removed console.log and added in module.exports so every file could see this line of code
// s40: added .contracts[':Inbox'] - this drills down into contracts object and allows us to grab the bytecode property
// s50: 2 key properties - 1) interface (JS ABI) 2) bytecode (actual raw compiled contract)
// importing both of these properties from compile.js to inbox.test.js
module.exports = solc.compile(source, 1).contracts[':Inbox'];

