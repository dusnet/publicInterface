const CONTRACT_ABI = [
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

module.exports = { CONTRACT_ABI };