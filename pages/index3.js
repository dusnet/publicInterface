import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
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

        <form className={styles.urlForm} action="/api/url" method="post">
          <input type="text" name="url" className="form-control" placeholder="Your URL" style={{textAlign: "center"}} required></input>
          <br></br>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">Shorten!</button>
          </div>
        </form>

        {/* <form className={styles.urlForm} action="/api/url" method="post">
            <input type="text" className={styles.lineInput} name="url" placeholder="Your URL" required />
            <button type="submit" className={styles.submit}>Shorten!</button>
        </form> */}

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
