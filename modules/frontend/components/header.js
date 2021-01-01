import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/notImplemented">
        <a>Contact Me</a>
      </Link>
    </div>
  );
}
