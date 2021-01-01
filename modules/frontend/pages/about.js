import styles from "../styles/Home.module.css";
import Footer from "../components/footer";
import Header from "../components/header";

export default function About() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1>About</h1>
      </main>
      <Footer />
    </div>
  );
}
