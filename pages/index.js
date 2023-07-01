import Head from 'next/head';
import styles from '../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.css'
import Router from "next/router";
import { useQRCode } from 'next-qrcode';

var urlId = "N/A";
var shortURL = "N/A";
var successDisplayValue = "none";
var errorDisplayValue = "none";
var submitDisplayValue = "block";
var loadingDisplayValue = "none";

const handleSubmit = async (event) => {
  submitDisplayValue = "none";
  loadingDisplayValue = "block";
  Router.replace(Router.asPath);
  // Stop the form from submitting and refreshing the page.
  event.preventDefault()

  // Get data from the form.
  const data = {
    url: event.target.url.value,
  }

  // Send the data to the server in JSON format.
  const JSONdata = JSON.stringify(data)

  // API endpoint where we send form data.
  const endpoint = '/api/url'

  // Form the request for sending data to the server.
  const options = {
    // The method is POST because we are sending data.
    method: 'POST',
    // Tell the server we're sending JSON.
    headers: {
      'Content-Type': 'application/json',
    },
    // Body of the request is the JSON data we created above.
    body: JSONdata,
  }

  // Send the form data to our forms API on Vercel and get a response.
  const response = await fetch(endpoint, options)

  // Get the response data from server as JSON.
  // If server returns the name submitted, that means the form works.
  const result = await response.json()
  urlId = result.data;

  const origin =
      typeof window !== 'undefined' && window.location.origin
          ? window.location.origin
          : '';
  
  if (urlId != "N/A"){
    shortURL = origin + "/" + urlId;
    successDisplayValue = "block";
  } else {
    errorDisplayValue = "block";
  }

  submitDisplayValue = "block";
  loadingDisplayValue = "none";
  Router.replace(Router.asPath);
}

export default function Home() {
  const { Canvas } = useQRCode();

  return (
    <div className={styles.container}>
      <Head>
        <title>DUS - A Decentralized URL Shortener</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <h1 className={styles.title}>
          DUS
        </h1>

        <p className={styles.description}>
          A Decentralized URL Shortener
        </p>

        <p className={styles.description}>
          <code>Your URLs will never die. They'll always exist on the blockchain!</code>
        </p>
        
        <br></br>
        <div className={styles.urlForm} style={{display: successDisplayValue}}>
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            Your shortened URL is available at: <a href={shortURL} target="_blank"><strong>{shortURL}</strong></a>
            <p></p>
            <p>Additionally, a QR code for the generated shortened URL is provided below: </p>
          </div>
          <center>
            <Canvas
              text={shortURL}
              options={{
                level: 'M',
                margin: 3,
                scale: 4,
                width: 200,
              }}
            />
          </center>
        </div>
        <div className={styles.urlForm} style={{display: errorDisplayValue}}>
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            There's currently a high demand on our active agents. Try again later or use DUS.network to pay for your own gas fees.
          </div>
        </div>

        <form className={styles.urlForm} onSubmit={handleSubmit}>
          <input type="text" name="url" className="form-control" placeholder="Your URL" style={{textAlign: "center"}} required></input>
          <br></br>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary" style={{display: submitDisplayValue}}>Shorten!</button>
            <button className="btn btn-primary" type="button" style={{display: loadingDisplayValue}} disabled>
              <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              Processing...
            </button>
          </div>
        </form>

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
