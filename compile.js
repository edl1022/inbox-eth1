// compile code will go here
const path = require('path');
const fs = require('fs');

// __dirname is a constant that will always take you to working directory
// this line of code generates a path that points directly to Inbox.sol file
// using this function ensures this path works on either windows or unix based systems
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');


const source = fs.readFileSync(inboxPath, 'utf8');