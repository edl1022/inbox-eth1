// contract test code will go here
// s43: assert is a library used for making assertions about tests
// ganache will serve as our local ethereum test network
// Web3 is uppercase because we're importing a constructor function used to create instances of the Web3 library
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

// s45: creates instance of web3 constructor and tells it to connect to ganache
// ganache is the local test network we are hosting on our machine solely for the purpose of running these tests
// in the future we will replace ganache with a different network (ie Rinkeby)
// concept of a provider is siginificant. this is the only time we use the capital "W" Web3
const web3 = new Web3(ganache.provider());

// s50: importing interface and bytecode properties from compile.js
const { interface, bytecode } = require ('../compile');

// s49: defining accounts variable before tests
let accounts;
// s50: initializaing inbox variable for tests
let inbox;
// s53: more robust test w/ common variable for default message
const INITIAL_STRING = 'Hi There!';

// s48:deploy to ganache
beforeEach(async () => {
/* 	// get a list of all accounts
	// eth is a module of the web3 library. accessing getAccounts() function on that module
	// every  function we call in web3 is asynchronous in nature, so always returning a promise
	// so this function is delivering a promise with the list of accounts we care about
	web3.eth.getAccounts()
		// chain on .then to get access to accounts that above function returns
		.then(fetchedAccounts => {
			console.log(fetchedAccounts)
		}); */

	// s49 get a list of all accounts using async/await instead of promises
	// also marking beforeEach with an async right before arrow function (line 16)
	accounts = await web3.eth.getAccounts(); 

	// s50 use one of these accounts to deploy the contract
	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ 
			data: bytecode, 
			arguments: [INITIAL_STRING]
		 })
		.send({ from: accounts[0], gas:'1000000' });
});

// s48 dummy test
describe('Inbox', () => {
	it('deploys a contract', () => {
		// s50: view inbox contract
		// console.log(inbox);
		// s52: testing whether we have address of whatever contract was deployed to
		assert.ok(inbox.options.address);
	});

	// s53: making sure we get a default message when creating a new contract
	// calling a method is relatively async
	it('has a default message', async () => {
		// going to be writing this line many times
		// inbox = JS object that is instance of contract that exists on blockchain
		// methods = object on inbox that contains all public methods that exist on our contract
		// message() = property that exists on message object (line 6 in Inbox.sol)
		// first set of parentheses on message() are way to customize list of arguments being passed
		// parentheses on call() customize exactly how that function gets called
		const message = await inbox.methods.message().call();
		
		// making sure it equals default message on lines 43
		assert.equal(message, INITIAL_STRING);
	});

	// s54 trying to modify contracts data, not just 'Calling' a function here
	it('can change the message', async() => {
		// can think of .send() as sending a transaction
		await inbox.methods.setMessage('bye').send( { from: accounts[0] });
		const message = await inbox.methods.message().call();
		// making sure it equals new message we just set it toS
		assert.equal(message, 'bye');

	});
});



/* // s46: sample test - mocha practice
class Car {
	park () {
		return 'stopped';
	}

	drive() {
		return 'vroom';
	}
}

let car;
//everything in here is run before the tests
beforeEach(() => {
//	const car = new Car(); 		JS scope doesn't allow, so intialized car above
	car = new Car();
});

describe('Car Class', () => {
	it('can park', () => {
//		const car = new Car();		used beforeEach() instead
		assert.equal(car.park(), 'stopped');  
	});
	it('can drive', () => {
//		const car = new Car();		used beforeEach() instead
		assert.equal(car.drive(), 'vroom');  
	})
});
 */
