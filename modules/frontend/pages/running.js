import styles from "../styles/Home.module.css";
import Footer from "../components/footer";
import Header from "../components/header";

export default function Running() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1>Running</h1>
      </main>
      <Footer />
    </div>
  );
}
