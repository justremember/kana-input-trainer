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
        <h1>Kana Input Trainer with SRS</h1>
        <p>Uses a simple SRS algorithm. Keyboard reference image below. <a href='https://github.com/justremember/kana-input-trainer'>Source code here.</a></p>
        <h5>How to use</h5>
        <p>Click on the text box. Type the kana as shown on the center of the screen.
        </p>
        <p>
          Ignore the textbox. Ignore the IME. No need to press backspace, tab, or space. Just focus on pressing the correct key.
        </p>
        <KanaInputTrainer />
        <Image
          src={kanaInputLayout}
          alt='Kana Input Layout'
          style={{margin: '50px auto 0 auto', display: 'block'}}
        />
        <div className='mt-5'>
          <h5>Known Issues</h5>
          <ul>
            <li>Sadly I could not get the autosave feature to work, so here are &quot;Save State&quot; & &quot;Load State&quot; buttons instead.</li>
          </ul>
        </div>
      </main>
    </>
  )
}
