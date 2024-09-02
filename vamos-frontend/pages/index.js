import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>VAMOS Sports Hub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main>
        <header className={styles.header}>
          <div className={styles.logo}>
            <a href="/">
              <img src="/vamos-high-resolution-logo-transparent.svg" alt="VAMOS Logo" />
            </a>
          </div>
          <div className={styles.loginButton}>
            <Button variant="outlined" href="#outlined-buttons">
            Login
            </Button>
            {/* <a href="/login">Login</a> */}
          </div>
        </header>
        <h1 className={styles.title}>
          Welcome to <a href="https://vamos.com">VAMOS Sports Hub</a>
        </h1>

        <p className={styles.description}>
          One Place to Unite All Sports Enthusiasts
        </p>

        <div className={styles.grid}>
          <a href="/fan-clubs" className={styles.card}>
            <h3>Fan Clubs &rarr;</h3>
            <p>Join your favorite teams' fan clubs and connect with other fans.</p>
          </a>

          <a href="/leaderboards" className={styles.card}>
            <h3>Leaderboards &rarr;</h3>
            <p>Track your favorite teams' and players' rankings in real-time.</p>
          </a>

          <a href="/sports-blogs" className={styles.card}>
            <h3>Sports Blogs &rarr;</h3>
            <p>Read and share insights on the latest sports news and trends.</p>
          </a>

          <a href="/events" className={styles.card}>
            <h3>Upcoming Events &rarr;</h3>
            <p>
              Stay updated with upcoming sports events and matches.
            </p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vamos.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="vamos-high-resolution-logo.png" alt="VAMOS" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        header {
          width: 100%;
          padding: 0px 4rem;
          display: flex;
          justify-content: space-between;
          align-items: center; /* Dark background for the navbar */
          // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Slight shadow for depth */
        }
        .logo img {
          height: 40px; /* Adjust logo size */
        }
        .nav {
          display: flex;
          gap: 20px;
        }
        .navLink {
          color: #FFFFFF; /* White text for links */
          text-decoration: none;
          font-size: 16px;
          transition: color 0.3s ease;
        }
        .navLink:hover {
          color: #2ECC71; /* Green text on hover */
        }
        .loginButton a {
          background-color: #2ECC71; /* Green background for button */
          color: #FFFFFF; /* White text */
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }
        .loginButton a:hover {
          background-color: #27AE60; /* Darker green on hover */
        }
        main {
          padding: 5rem 0;
          flex: 1;
          color: white;
          display: flex;
          width:100vw;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 2px solid black;
          background: #0f0c29;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #24243e, #302b63, #0f0c29); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

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
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
