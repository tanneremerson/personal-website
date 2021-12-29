import Head from "next/head";
import Link from "next/link";

import Footer from "../components/footer";
import Header from "../components/header";
import styles from "../styles/Home.module.css";

// TODO: Update the favicon
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tanner&#39;s World</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>Hi, I&#39;m Tanner!</h1>
        <div className={styles.grid}>
          <Link href="/about">
            <a className={styles.card}>
              <h3>About &rarr;</h3>
              <p>
                Learn about the technologies and decisions powering this site.
              </p>
            </a>
          </Link>

          <Link href="/running">
            <a className={styles.card}>
              <h3>Running &rarr;</h3>
              <p>
                Read about my running journey and check out my stats. I&#39;ve got big
                goals for 2021!
              </p>
            </a>
          </Link>

          <Link href="/programming">
            <a className={styles.card}>
              <h3>Programming &rarr;</h3>
              <p>These are the projects I want to share with you : ).</p>
            </a>
          </Link>

          <Link href="/interests">
            <a className={styles.card}>
              <h3>Interests &rarr;</h3>
              <p>
                Videos that I felt had learning with sharing, hope you enjoy too.
              </p>
            </a>
          </Link>

          <Link href="/goals">
            <a className={styles.card}>
              <h3>Goals &rarr;</h3>
              <p>Interested in what i&#39;m trying to achieve?</p>
            </a>
          </Link>

        </div>
      </main>

      <Footer />
    </div>
);
}
