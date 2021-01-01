import styles from "../styles/Home.module.css";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Goals() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1>Goals</h1>
      </main>
      <Footer />
    </div>
  );
}
