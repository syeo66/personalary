import type { NextPage } from 'next'
import Head from 'next/head'

import Background from '../components/Background'
import Screen from '../components/Screen'

const Home: NextPage = () => {
  return (
    <Screen>
      <Head>
        <title>Personalary - my personal smart mirror</title>
        <meta name="description" content="my personal smart mirror" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Background />
    </Screen>
  )
}

export default Home
