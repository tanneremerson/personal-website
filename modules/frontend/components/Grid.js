import Link from "next/link";

import styles from "../styles/Home.module.css";

// pass href, cardName, description
function Card (props) {
  return (
    <Link href={props.path}>
      <a className={styles.card}>
        <h3>{props.cardName} &rarr;</h3>
        <p>{props.description}</p>
      </a>
    </Link>
  );
}


/*
 Example input
 -------------
 [{
    path: 'about/',
    cardName: 'About',
    description: 'Learn about the technologies and decisions powering this site.',
 }]
 */
export default function Grid (props) {
  return(
    <div className={styles.grid}>
      {props.cards.map(card => Card(card))}
    </div>
  );
}
