import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (

    <div className={styles.container}>
      <Head>
        <title>
          Coffee Chase   
        </title>
      </Head>
      <main className={styles.main}>
      <Banner buttonText='Discover stores nearby!'/>
      </main>
    </div>
  )
}

export default Home
