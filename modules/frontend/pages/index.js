import Head from "next/head";
import Link from "next/head";
import Footer from "../components/footer";
import Header from "../components/header";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tanner's World</title>
        // TODO: Update the favicon
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Hi, I'm Tanner!</h1>
        <div className={styles.grid}>
          <a href="/about" className={styles.card}>
            <h3>About &rarr;</h3>
            <p>
              Learn about the technologies and decisions powering this site.
            </p>
          </a>

          <a href="/running" className={styles.card}>
            <h3>Running &rarr;</h3>
            <p>
              Read about my running journey and check out my stats. I've got big
              goals for 2021!
            </p>
          </a>

          <a href="/programming" className={styles.card}>
            <h3>Programming &rarr;</h3>
            <p>These are the projects I want to share with you : ).</p>
          </a>

          <a href="/interests" className={styles.card}>
            <h3>Interests &rarr;</h3>
            <p>
              Videos that I felt had learning with sharing, hope you enjoy too.
            </p>
          </a>

          <a href="/goals" className={styles.card}>
            <h3>Goals &rarr;</h3>
            <p>Interested in what i'm trying to achieve?</p>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
