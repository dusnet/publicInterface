import Web3 from "web3";
var accounts = {
    "acc1": "free",
    "acc2": "free",
    "acc3": "free"
};

const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "givenId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "givenURL",
				"type": "string"
			}
		],
		"name": "setURL",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "givenId",
				"type": "string"
			}
		],
		"name": "getURL",
		"outputs": [
			{
				"internalType": "string",
				"name": "url",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "ids",
		"outputs": [
			{
				"internalType": "string",
				"name": "url",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isValue",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// For CELO NETWORK
// const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
// const DUSContract = new web3.eth.Contract(abi, "0x5f4CE13F55b2698f0Ee402fFcE4805fC0f6748fb");

const web3 = new Web3("https://polygon-rpc.com");
const DUSContract = new web3.eth.Contract(abi, "0xa4e031Cddf9BF145f331d1A21eB9cC5290452cdc");

/**
 * Returns the URL based on a given id
 * @param {string} id The shortened URL ID
 * @return {Promise<string>} The URL for the given ID is returned. If the ID is invalid, "N/A" is returned.
 */
async function getURL(id){
	// console.log(await web3.eth.getGasPrice().then(console.log));
    try {
        var url = await DUSContract.methods.getURL(id).call();
        return url;
    } catch (e){
        return "N/A";
    }
}

/**
 * This function shortens a URL. It generates a random ID for the URL, records the ID in the smart contract, and then returns that id.
 * This function does ensure that the ID that is generated is unique. Note that the generated id will always start with "c" since this URL
 * is currently stored in the Celo network.
 * @param {string} url The URL to be shortened 
 * @return {Promise<string>} The shortened URL's id
 */
async function shortenURL(url){
    var id = "N/A";

	var agent = getFreeAgent();
	accounts[agent] = "locked";
	if (agent == "N/A"){
		return "N/A";
	}

    // Ensure the ID is unique and not taken by another URL in the contract
    while (id == "N/A"){
        id = generateId(6);
        if (await getURL("p" + id) != "N/A"){
            id = "N/A";
        }
    }
	var privateKey = getPrivateFromAgent(agent);
	console.log(privateKey);
	console.log(agent);
	console.log(process.env.ACCOUNT1)
    var acc = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(acc);
    web3.eth.defaultAccount = acc.address;

	// const gasPrice = signer.gasPrice();
	
	// const gasLimit = DUSContract.estimateGas.setURL(id, url);
	DUSContract.methods.setURL(id, url).estimateGas(
        {
            from: acc.address
        }, function(error, estimatedGas) {
			console.log(estimatedGas);
        }
    );
	console.log("SDDD_________");
	// console.log(gasLimit);
	console.log(await web3.eth.getGasPrice());

    await DUSContract.methods.setURL(id, url).send({from: acc.address, gas: 227079, gasPrice: 274219599216});
	
	accounts[agent] = "free";

    return "p" + id;
}

/**
 * Retireves a free agent.
 * @return {string} Returns the agent account number "acc1" or returns "N/A" meaning there are no free agents.
 */
function getFreeAgent(){
	var keys = Object.keys(accounts);
	for (var i = 0; i < keys.length; i++){
		if (accounts[keys[i]] == "free"){
			return keys[i];
		}
	}
	return "N/A";
}

/**
 * Retireves the private key of a given agent.
 * @param {string} agent The account number "acc1"
 * @returns {string} Returns the private key or "N/A" if the account is not found
 */
function getPrivateFromAgent(agent){
	if (agent == "acc1"){
		return process.env.ACCOUNT1;
	} else if (agent == "acc2"){
		return process.env.ACCOUNT2;
	} else if (agent == "acc3"){
		return process.env.ACCOUNT3;
	}
	return "N/A";
}

/**
 * This function generates a random ID for a URL based on a provided length.
 * @param {number} length The length of the ID
 * @return {number} Returns a randomly generated ID
 */
function generateId(length) {
    var chars = "aAbBcCdD9eEfFg3GhHiI4jJkKlLmM5n0NoOpPqQr2RsStTu16UvVwW7xXyY8zZ"
    var id = "";
    for (var i = 0; i < length; i++) {
        id += chars[Math.floor(Math.random() * 62)];
    }
    return id;
}

module.exports = { getURL, shortenURL };