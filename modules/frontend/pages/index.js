import Layout from '../components/Layout';
import Grid from '../components/Grid';

import styles from '../styles/Home.module.css';

const cards = [
  {
    path: 'about/',
    cardName: 'About',
    description: 'Learn about the technologies and decisions powering this site.',
  },
  {
    path: 'running/',
    cardName: 'Running',
    description: 'Read about my running journey and check out my stats. I\'ve got big goals for 2022!',
  },
  {
    path: '/programming',
    cardName: 'Programming',
    description: 'These are the projects I want to share with you : ).',
  },
  {
    path: '/interests',
    cardName: 'Interests',
    description: 'Videos that I felt had learning with sharing, hope you enjoy too.',
  },
  {
    path: '/goals',
    cardName: 'Goals',
    description: 'Interested in what i\'m trying to achieve?',
  },
];

export default function Home() {
  return (
    <Layout>
      <h1 className={styles.title}>Hi, I&#39;m Tanner!</h1>
      <Grid cards={cards}/>
    </Layout>
  );
}
