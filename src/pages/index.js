import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import KanaInputTrainer from '@/components/KanaInputTrainer';
import kanaInputLayout from '@/images/kana-input-layout.png';

export default function Home() {
  return (
    <>
      <Head>
        <title>Kana Input Trainer</title>
        <meta name="description" content="Learn how to use kana input!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='container-sm'>
        <h1>Kana Input Trainer</h1>
        <p>Uses a simple SRS algorithm. Keyboard reference image below.</p>
        <KanaInputTrainer />
        <Image
          src={kanaInputLayout}
          alt='Kana Input Layout'
          style={{margin: '50px auto 0 auto', display: 'block'}}
        />
      </main>
    </>
  )
}
