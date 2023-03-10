import Web3 from "web3";

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

export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
  
    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body)
  
    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.url) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: 'First or last name not found' })
    }
    
    var id = "c" + await shortenURL(body.url);
    // Found the name.
    // Sends a HTTP success code
    res.status(200).json({ data: `/${id}` })
}

async function shortenURL(url){
    const web3 = new Web3("https://alfajores-forno.celo-testnet.org");

    var id = generateId(6);
    console.log(id);
    // MAKE SURE THE ID IS UNIQUE!
    var acc = web3.eth.accounts.privateKeyToAccount("02173794fcbe4b9cb1de71e0ff04496b0ae8381a9e3782742f7dcab175478185");
    web3.eth.accounts.wallet.add(acc);
    web3.eth.defaultAccount = acc.address;


    // web3.eth.accounts.create();
    // console.log(await web3.eth.getAccounts());



    console.log(acc.address);

    var MyContract = new web3.eth.Contract(abi, "0x5f4CE13F55b2698f0Ee402fFcE4805fC0f6748fb");

    var dt = await MyContract.methods.setURL(id, url).send({from: acc.address, gasLimit: 300000});
    console.log(dt);
    return id;
}

function generateId(length) {
    var chars = "aAbBcCdD9eEfFg3GhHiI4jJkKlLmM5n0NoOpPqQr2RsStTu16UvVwW7xXyY8zZ"
    var id = "";
    for (var i = 0; i < length; i++) {
        id += chars[Math.floor(Math.random() * 62)];
    }
    return id;
}