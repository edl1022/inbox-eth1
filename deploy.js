// deploy code will go here
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile')

// s58: simultaneously specify 1) which account we're going to unlock and
// use as source of ether for deploying contract and 2) specify what API or
// what outside node we are going to connect to
const provider = new HDWalletProvider(
	'west dumb tone jungle chest giant labor certain express husband wild flush',
	'https://rinkeby.infura.io/v3/7480d4de44a849139e308f0ea7ffacc4'
);

const web3 = new Web3(provider);

const deploy = async () => {
	// remember that account mnemonic can create many different accounts, not just specifying one account
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account', accounts[0]);

	const result = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode, arguments: ['Hi there!']})
		.send({ gas: '1000000', from: accounts[0], gasPrice: '30000000000' });

	// record actual address that contract ended up at
	console.log('Contract deployed to', result.options.address);
};

deploy();