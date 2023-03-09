import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useEffect} from 'react'
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

// console.log(web3.eth.getBalance("0xb6C90Eb146D031B32827bBacc8392B902BeFba03"))
// var MyContract = new web3.eth.Contract(abi);
// var myContractInstance = MyContract.at('0xb6C90Eb146D031B32827bBacc8392B902BeFba03');

function Page({params}) {
  if (params[0] == "redirect"){
    useEffect(() => {
      window.location.assign(params[1])
    })
    return(
        <>
        </>
    )
  } else {
    return (
      <div className={styles.container}>
        <Head>
          <title>DUS</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main>
          <h1 className={styles.title}>
            DUS
          </h1>
  
          <p className={styles.description}>
            The given URL does not exist!
          </p>
  
        </main>
  
        <footer>
          <a href="https://zao.dev">
            Powered By ZAO
          </a>
        </footer>
  
        <style jsx>{`
          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          footer img {
            margin-left: 0.5rem;
          }
          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            color: inherit;
          }
          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }
        `}</style>
  
        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }
          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    )
  }
}

Page.getInitialProps = async function({query}) {
  var id = query["id"];
  const web3 = new Web3("https://alfajores-forno.celo-testnet.org");

  var MyContract = new web3.eth.Contract(abi, "0x5f4CE13F55b2698f0Ee402fFcE4805fC0f6748fb");

  // var id = router.asPath.substring(1);
  var url = "N/A";
  try {
    url = await MyContract.methods.getURL(id).call();
    return { params: ["redirect", url] }
  } catch (e){
    return { params: ["N/A", "N/A"] }
  }
}

export default Page