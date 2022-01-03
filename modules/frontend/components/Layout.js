import Head from 'next/head'

import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

// TODO: Update the favicon
export default (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tanner&#39;s World</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <div className="container">{props.children}</div>
      </main>

      <Footer />
    </div>
  );
}
